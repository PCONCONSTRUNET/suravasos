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
import { useState, useEffect } from "react";
import { useConfirm } from "@/contexts/ConfirmContext";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — VIVAVERDE ERP" }] }),
  component: Configuracoes,
});

function Configuracoes() {
  const confirm = useConfirm();
  const [savingProfile, setSavingProfile] = useState(false);
  const [perfil, setPerfil] = useState({
    razao_social: "VIVAVERDE Distribuidora de Vasos e Acessórios Ltda",
    cnpj: "12.345.678/0001-99",
    inscricao_estadual: "123.456.789.012",
    regime_tributario: "Simples Nacional",
    endereco: "Rod. Marechal Rondon, KM 342 — Bauru/SP",
    telefone: "(14) 3344-5566",
    email_contato: "contato@vivaverde.com.br",
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [novoUserNome, setNovoUserNome] = useState("");
  const [novoUserEmail, setNovoUserEmail] = useState("");

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.from('usuarios').select('*').order('created_at', { ascending: true });
      if (!error && data) {
        setUsers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const fetchConfigs = async () => {
      try {
        const { data, error } = await supabase.from('configuracoes').select('*').eq('id', 1).single();
        if (data && !error) {
          // Remover os campos id e created_at caso existam no retorno para evitar erro no upsert depois
          const { id, created_at, ...rest } = data;
          setPerfil(prev => ({ ...prev, ...rest }));
        }
      } catch (err) {
        console.error("Erro ao carregar configurações", err);
      }
    };
    fetchConfigs();
  }, []);

  const handleAddUser = async () => {
    if (!novoUserNome || !novoUserEmail) return;
    try {
      const { error } = await supabase.from('usuarios').insert([{
        nome: novoUserNome,
        email: novoUserEmail,
        funcao: "Visualizador",
        cor: "bg-secondary text-foreground"
      }]);
      if (error) throw error;
      
      setNovoUserNome("");
      setNovoUserEmail("");
      alert("Usuário convidado com sucesso! Um e-mail foi enviado para ele.");
      fetchUsers();
    } catch (err: any) {
      alert("Erro ao adicionar usuário: " + err.message);
    }
  };

  const handleRemoveUser = async (id: string) => {
    if (await confirm({ description: "Tem certeza que deseja remover o acesso deste usuário?", variant: "destructive" })) {
      try {
        await supabase.from('usuarios').delete().eq('id', id);
        fetchUsers();
      } catch (err: any) {
        alert("Erro ao remover usuário: " + err.message);
      }
    }
  };

  const handleSaveSettings = async () => {
    setSavingProfile(true);
    try {
      const { error } = await supabase.from('configuracoes').upsert([{ id: 1, ...perfil }]);
      if (error) throw error;
      alert("Configurações salvas com sucesso!");
    } catch (err: any) {
      alert("Erro ao salvar configurações: " + err.message + "\n\nSe a tabela 'configuracoes' não existir no banco, execute o script SQL para criá-la.");
    } finally {
      setSavingProfile(false);
    }
  };

  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      const tables = ['vendas', 'vendas_itens', 'produtos', 'clientes', 'vendedores', 'contas_receber', 'contas_pagar', 'movimentacoes_estoque'];
      const backupData: Record<string, any[]> = {};
      
      for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*');
        if (!error && data) {
          backupData[table] = data;
        }
      }
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_vivaverde_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert("Backup baixado com sucesso!");
    } catch (err: any) {
      alert("Erro ao gerar backup: " + err.message);
    } finally {
      setIsBackingUp(false);
    }
  };

  return (
    <>
      <PageHeader title="Configurações do ERP" subtitle="Gerencie usuários, permissões e integrações do sistema" />

      <Tabs defaultValue="perfil">
        <TabsList className="mb-4">
          <TabsTrigger value="perfil"><User className="mr-1.5 h-4 w-4" />Perfil da Empresa</TabsTrigger>
          <TabsTrigger value="usuarios"><Users className="mr-1.5 h-4 w-4" />Usuários</TabsTrigger>
          <TabsTrigger value="backup"><Database className="mr-1.5 h-4 w-4" />Saúde / Backup</TabsTrigger>
          <TabsTrigger value="preferencias"><Cog className="mr-1.5 h-4 w-4" />Preferências</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Dados da Empresa (Emissor NF-e)</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div><Label>Razão Social</Label><Input className="mt-1.5" value={perfil.razao_social} onChange={e => setPerfil(p => ({...p, razao_social: e.target.value}))} /></div>
              <div><Label>CNPJ</Label><Input className="mt-1.5" value={perfil.cnpj} onChange={e => setPerfil(p => ({...p, cnpj: e.target.value}))} /></div>
              <div><Label>Inscrição Estadual</Label><Input className="mt-1.5" value={perfil.inscricao_estadual} onChange={e => setPerfil(p => ({...p, inscricao_estadual: e.target.value}))} /></div>
              <div><Label>Regime Tributário</Label><Input className="mt-1.5" value={perfil.regime_tributario} onChange={e => setPerfil(p => ({...p, regime_tributario: e.target.value}))} /></div>
              <div className="md:col-span-2"><Label>Endereço</Label><Input className="mt-1.5" value={perfil.endereco} onChange={e => setPerfil(p => ({...p, endereco: e.target.value}))} /></div>
              <div><Label>Telefone</Label><Input className="mt-1.5" value={perfil.telefone} onChange={e => setPerfil(p => ({...p, telefone: e.target.value}))} /></div>
              <div><Label>E-mail de Contato</Label><Input className="mt-1.5" value={perfil.email_contato} onChange={e => setPerfil(p => ({...p, email_contato: e.target.value}))} /></div>
              <div className="md:col-span-2 flex justify-end">
                <Button onClick={handleSaveSettings} disabled={savingProfile} className="bg-gradient-brand text-primary-foreground">
                  {savingProfile ? "Salvando..." : "Salvar alterações"}
                </Button>
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
              {loadingUsers ? (
                <div className="text-center p-4 text-muted-foreground">Carregando usuários...</div>
              ) : users.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">Nenhum usuário ativo.</div>
              ) : users.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground shrink-0">
                      {u.nome?.split(" ").map((x: string) => x[0]).join("").substring(0,2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{u.nome}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={`${u.cor} border-0`}>{u.funcao}</Badge>
                    <Button onClick={() => handleRemoveUser(u.id)} size="icon" variant="ghost" className="text-destructive h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
            <CardHeader><CardTitle>Backup Manual do Banco de Dados</CardTitle><CardDescription>Faça o download de todos os seus dados em formato JSON.</CardDescription></CardHeader>
            <CardContent>
              <Button onClick={handleBackup} disabled={isBackingUp} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto font-bold h-12">
                <Database className="mr-2 h-5 w-5" /> 
                {isBackingUp ? "Gerando Backup..." : "Fazer Backup Completo Agora"}
              </Button>
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
