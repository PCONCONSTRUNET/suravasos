import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabaseParceiro as supabase } from "@/lib/supabase";
import { VivaverdeLogo } from "@/components/vivaverde-logo";
import { Home, Calculator, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/parceiro")({
  beforeLoad: async ({ location }) => {
    if (typeof window === 'undefined') return;
    
    // Se a rota for o login ou cadastro, não faz a checagem restritiva
    if (location.pathname === '/parceiro/login' || location.pathname === '/parceiro/cadastro') return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw redirect({ to: "/parceiro/login" });
      }

      // Parceiro está logado, a proteção da rota foi garantida pelo session check.
      // O controle de tela (Aguardando Aprovação / Rejeitado) será feito diretamente
      // dentro do parceiro.dashboard.tsx para que o usuário não seja expulso.
      sessionStorage.removeItem('parceiro_blocked');

    } catch (err: any) {
      // Se o erro é um redirect do TanStack Router, repassa normalmente
      if (err?.isRedirect || err?.message === 'redirect') throw err;
      // Qualquer outro erro de rede/DB: deixa passar sem bloquear o acesso
      console.warn('[parceiro beforeLoad] erro ao verificar status:', err);
    }
  },
  component: ParceiroLayout,
});

function ParceiroLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Se for a tela de login ou cadastro, não mostra o menu inferior
  if (pathname === '/parceiro/login' || pathname === '/parceiro/cadastro') {
    return <Outlet />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/parceiro/login';
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-center border-b bg-white shadow-sm px-4">
        <VivaverdeLogo size="small" />
      </header>

      <main className="flex-1 p-4 max-w-md w-full mx-auto">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full border-t bg-white px-6 py-3 flex justify-around items-center max-w-md left-1/2 -translate-x-1/2 z-40 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link 
          to="/parceiro/dashboard" 
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
            pathname.includes('dashboard') ? "text-primary" : "text-muted-foreground hover:text-slate-900"
          )}
        >
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Início</span>
        </Link>
        <Link 
          to="/parceiro/pdv" 
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
            pathname.includes('pdv') ? "text-primary" : "text-muted-foreground hover:text-slate-900"
          )}
        >
          <div className="h-12 w-12 rounded-full bg-gradient-brand text-primary-foreground grid place-items-center -mt-8 shadow-lg ring-4 ring-slate-50">
            <Calculator className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-medium">Vender</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-[10px] font-medium">Sair</span>
        </button>
      </nav>
    </div>
  );
}
