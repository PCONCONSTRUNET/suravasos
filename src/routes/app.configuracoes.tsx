import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Shield, Users, User, Settings as Cog, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useConfirm } from "@/contexts/ConfirmContext";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — VIVAVERDE ERP" }] }),
  component: Configuracoes,
});

function Configuracoes() {
  const confirm = useConfirm();
  const [users, setUsers] = useState([
    { id: 1, n: "Douglas de Almeida", e: "douglas@vivaverde.com.br", r: "Administrador", c: "bg-primary/10 text-primary" },
    { id: 2, n: "Camila Torres", e: "camila@vivaverde.com.br", r: "Financeiro", c: "bg-info/15 text-info" },
    { id: 3, n: "Diego Oliveira", e: "diego@vivaverde.com.br", r: "Vendedor", c: "bg-success/15 text-success" },
    { id: 4, n: "Patrícia Souza", e: "patricia@vivaverde.com.br", r: "Estoquista", c: "bg-terra/10 text-terra" },
  ]);

  const [novoUserNome, setNovoUserNome] = useState("");
  const [novoUserEmail, setNovoUserEmail] = useState("");

  const handleAddUser = () => {
    if (!novoUserNome || !novoUserEmail) return;
    setUsers([...users, { 
      id: Date.now(), 
      n: novoUserNome, 
      e: novoUserEmail, 
      r: "Visualizador", 
      c: "bg-secondary text-foreground" 
    }]);
    setNovoUserNome("");
    setNovoUserEmail("");
    alert("Usuário convidado com sucesso! Um e-mail foi enviado para ele.");
  };

  const handleRemoveUser = async (id: number) => {
    if (await confirm({ description: "Tem certeza que deseja remover o acesso deste usuário?", variant: "destructive" })) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSaveSettings = () => {
    alert("Configurações salvas com sucesso no Supabase!");
  };

  const handleBackup = () => {
    alert("Iniciando download do Backup Completo do Banco de Dados (.sql)...");
  };

  return (
    <>
      <PageHeader title="Configurações do ERP" subtitle="Gerencie usuários, permissões e integrações do sistema" />

      <Tabs defaultValue="perfil">
        <TabsList className="mb-4">
          <TabsTrigger value="perfil"><User className="mr-1.5 h-4 w-4" />Perfil da Empresa</TabsTrigger>
          <TabsTrigger value="usuarios"><Users className="mr-1.5 h-4 w-4" />Usuários</TabsTrigger>
          <TabsTrigger value="permissoes"><Shield className="mr-1.5 h-4 w-4" />Permissões</TabsTrigger>
          <TabsTrigger value="backup"><Database className="mr-1.5 h-4 w-4" />Saúde / Backup</TabsTrigger>
          <TabsTrigger value="preferencias"><Cog className="mr-1.5 h-4 w-4" />Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Dados da Empresa (Emissor NF-e)</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><Label>Razão Social</Label><Input className="mt-1.5" defaultValue="VIVAVERDE Distribuidora de Vasos e Acessórios Ltda" /></div>
              <div><Label>CNPJ</Label><Input className="mt-1.5" defaultValue="12.345.678/0001-99" /></div>
              <div><Label>Inscrição Estadual</Label><Input className="mt-1.5" defaultValue="123.456.789.012" /></div>
              <div><Label>Regime Tributário</Label><Input className="mt-1.5" defaultValue="Simples Nacional" /></div>
              <div className="md:col-span-2"><Label>Endereço</Label><Input className="mt-1.5" defaultValue="Rod. Marechal Rondon, KM 342 — Bauru/SP" /></div>
              <div><Label>Telefone</Label><Input className="mt-1.5" defaultValue="(14) 3344-5566" /></div>
              <div><Label>E-mail de Contato</Label><Input className="mt-1.5" defaultValue="contato@vivaverde.com.br" /></div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={handleSaveSettings} className="bg-gradient-brand text-primary-foreground">Salvar alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card className="shadow-card mb-6">
            <CardHeader><CardTitle>Adicionar Novo Usuário</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end flex-wrap">
                <div className="space-y-2 flex-1 min-w-[200px]">
                  <Label>Nome Completo</Label>
                  <Input value={novoUserNome} onChange={e => setNovoUserNome(e.target.value)} placeholder="Ex: João da Silva" />
                </div>
                <div className="space-y-2 flex-1 min-w-[200px]">
                  <Label>E-mail</Label>
                  <Input value={novoUserEmail} onChange={e => setNovoUserEmail(e.target.value)} placeholder="joao@vivaverde.com.br" type="email" />
                </div>
                <Button onClick={handleAddUser} className="bg-primary text-primary-foreground">
                  <Plus className="mr-2 h-4 w-4" /> Convidar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle>Usuários Ativos do Sistema ({users.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground shrink-0">
                      {u.n.split(" ").map(x => x[0]).join("").substring(0,2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{u.n}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.e}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={`${u.c} border-0`}>{u.r}</Badge>
                    <Button onClick={() => handleRemoveUser(u.id)} size="icon" variant="ghost" className="text-destructive h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Permissões Globais por Módulo</CardTitle><CardDescription>Defina os padrões de acesso do sistema</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {["Operação (Produtos/Estoque/Clientes)", "Comercial (Vendas/Compras/PDV)", "Gestão (Financeiro/Logística)", "Canais (Portal/App/Catálogo)"].map((m) => (
                <div key={m} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-4 gap-4">
                  <p className="font-semibold">{m}</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Visualizar</label>
                    <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Editar</label>
                    <label className="flex items-center gap-2 text-sm"><Switch /> Excluir</label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="shadow-card mb-6">
            <CardHeader><CardTitle>Saúde do Sistema</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4 bg-success/10 border-success/20">
                <p className="text-sm font-semibold text-success">Status do Servidor Supabase</p>
                <p className="text-2xl font-bold text-success mt-1">Online & Operante</p>
              </div>
              <div className="rounded-xl border p-4 bg-info/10 border-info/20">
                <p className="text-sm font-semibold text-info">Uso de Armazenamento</p>
                <p className="text-2xl font-bold text-info mt-1">14% (1.4GB / 10GB)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle>Rotinas de Backup Automático</CardTitle><CardDescription>Último backup: Hoje, 03:00 — sucesso ✓</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-4 gap-4">
                <div><p className="font-semibold">Backup Diário do Banco de Dados</p><p className="text-xs text-muted-foreground">Armazenado em nuvem com retenção de 90 dias</p></div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleBackup} className="bg-brand text-primary-foreground"><Database className="mr-2 h-4 w-4" /> Baixar Backup SQL Agora</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Preferências e Notificações</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {["Enviar e-mail para contas a pagar vencendo no dia", "Alertar quando estoque atingir mínimo", "Resumo financeiro semanal por WhatsApp", "Habilitar sons de 'Caixa Registradora' no PDV"].map((p) => (
                <div key={p} className="flex items-center justify-between rounded-xl border p-4">
                  <p className="font-semibold text-sm">{p}</p>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
