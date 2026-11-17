# Acessos e integrações (sem segredos!)

| O quê | Como | Observações |
|---|---|---|
| **Instagram @vaidetaco** | Graph API, token salvo como segredo do ambiente para `graph.facebook.com` (injetado pelo proxy) | IDs em `meta.json`. Permissões atuais: instagram_basic, instagram_content_publish, pages_show_list, pages_read_engagement, business_management. **Falta** instagram_manage_insights. Token pode expirar → pedir novo e reabrir o formulário de credencial |
| **Nano Banana (Gemini)** | Chave salva para `generativelanguage.googleapis.com`; usar a rota **OpenAI-compatível** `/v1beta/openai/images/generations` (a rota nativa recusa o formato Bearer) | Conta pré-paga: erro 402 = sem saldo. ~US$0,04/imagem (`gemini-2.5-flash-image`) |
| **GitHub** | `LeoPalermoS/vaidetaco-instagram` (público hoje), app do Claude liberado | Commit + push ao fim de cada tarefa |
| **Canva** | Conector existe mas não autorizado | Não necessário |
| Instagram web / developers.facebook.com | **Bloqueados** na rede do ambiente | Usar a API ou prints do dono |
