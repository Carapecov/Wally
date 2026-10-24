# -*- coding: utf-8 -*-
"""
Utilitário de Gestão de Agentes — Ecossistema Wally
Permite listar agentes por status e gerar prompts de sistema customizados
com a persona, limites e decisões de validação de Giovane.
"""

import os
import re
import sys
import argparse

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECO_DIR = os.path.join(ROOT_DIR, "ecossistema")
VAL_FILE = os.path.join(ROOT_DIR, "VALIDACAO_AGENTES.md")

def listar_agentes():
    print("\n" + "="*70)
    print("🤖 ECOSSISTEMA WALLY — STATUS DOS AGENTES")
    print("="*70)
    
    with open(VAL_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    agent_matches = re.findall(r'(?:###|<h3 style=.*?>)\s*(🟡\s*)?([A-Z]{2}-\d{2})\s*—\s*(.*?)(?:</h3>|\n)', content)
    
    for is_yellow, code, name in agent_matches:
        if is_yellow or "PENDENTE" in name:
            status = "🟡 PENDENTE"
        elif "FI-05" in code:
            status = "❌ REMOVIDO"
        elif code.startswith(("CV-", "DI-", "AU-")):
            status = "⚪ FORA DO MVP"
        else:
            status = "🟢 VALIDADO"
        clean_name = name.split("(")[0].strip()
        print(f"[{status:^16}] {code} — {clean_name}")
    print("="*70 + "\n")

def gerar_prompt_sistema(agent_code):
    agent_code = agent_code.upper().strip()
    
    # Locate agent markdown file
    target_file = None
    for root, dirs, files in os.walk(os.path.join(ECO_DIR, "nucleos")):
        for f in files:
            if f.startswith(agent_code) and f.endswith(".md"):
                target_file = os.path.join(root, f)
                break
        if target_file:
            break
            
    if not target_file:
        print(f"❌ Agente {agent_code} não encontrado no ecossistema.")
        return

    with open(target_file, "r", encoding="utf-8") as f:
        card = f.read()
        
    with open(VAL_FILE, "r", encoding="utf-8") as f:
        val_content = f.read()
        
    # Extract decision from VALIDACAO_AGENTES.md
    pattern = rf'{agent_code}.*?⚖️ \*\*O Que Faremos Nesta Situação \(Decisão Operacional do Giovane\):\*\*\n\s*> (.*?)\n'
    decision_match = re.search(pattern, val_content, re.DOTALL)
    decision_text = decision_match.group(1).strip() if decision_match else "Seguir critérios da ficha padrão."

    print("\n" + "#"*70)
    print(f"PROMPT DE SISTEMA GERADO PARA O AGENTE: {agent_code}")
    print("#"*70 + "\n")
    
    prompt = f"""VOCÊ É O AGENTE ESPECIALISTA DO ECOSSISTEMA WALLY.

INFORMAÇÕES DA SUA FICHA OPERACIONAL:
{card}

DIRETRIZ OPERACIONAL DEFINIDA POR GIOVANE (RESPONSÁVEL DO PROJETO):
"{decision_text}"

INSTRUÇÕES CRÍTICAS DE COMPORTAMENTO:
1. Adote fielmente a persona, estilo de raciocínio e vocabulário técnico da sua ficha.
2. Respeite estritamente todos os limites listados em "Não deve fazer".
3. Identifique-se na abertura da resposta como: [{agent_code} — Nome do Agente | Ecossistema Wally].
4. Submeta recomendações e rascunhos para validação humana sempre que exigido pelo seu nível de autonomia.
"""
    print(prompt)
    print("#"*70 + "\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gerenciador de Agentes do Ecossistema Wally")
    parser.add_argument("--listar", action="store_true", help="Lista todos os agentes e seus status de validação")
    parser.add_argument("--prompt", type=str, help="Gera o prompt de sistema completo para o agente informado (ex: DE-01)")
    
    args = parser.parse_args()
    
    if args.listar or len(sys.argv) == 1:
        listar_agentes()
    elif args.prompt:
        gerar_prompt_sistema(args.prompt)
