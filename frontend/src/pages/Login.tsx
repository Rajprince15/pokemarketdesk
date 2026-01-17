import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Sparkles, User, Mail, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo credentials
  const demoCredentials = [
    { email: "ash@pokemon.trainer", password: "pikachu123", name: "Ash Ketchum" },
    { email: "misty@pokemon.trainer", password: "starmie456", name: "Misty" },
    { email: "brock@pokemon.trainer", password: "onix789", name: "Brock" },
  ];

  // Redirect if already logged in
  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if credentials match any demo user
    const user = demoCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );

    if (user) {
      login(email, password);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
      });
      navigate("/");
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password, or try a demo account.",
        variant: "destructive",
      });
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string, demoName: string) => {
    login(demoEmail, demoPassword);
    toast({
      title: "Demo Login Successful!",
      description: `Logged in as ${demoName}`,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
      <Header />
      <main className="container py-8 sm:py-12 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg mx-auto mb-4">
              <LogIn className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Sign in to access your Pokemon card collection</p>
          </div>

          

          {/* Login Form */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Login with Credentials</CardTitle>
              <CardDescription>
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ash@pokemon.trainer"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  {demoCredentials.map((demo, index) => (
                    <p key={index}>
                      <span className="text-primary">{demo.email}</span> / {demo.password}
                    </p>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" size="lg">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>

                <div className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Sign Up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
