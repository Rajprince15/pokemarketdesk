import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Mail, Package, Star, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isLoggedIn, login, register, logout } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    register(registerData.name, registerData.email, registerData.password);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
        <Header />
        <main className="container py-16 px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                          }
                          required
                          placeholder="ash@pokemon.trainer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                          }
                          required
                          placeholder="••••••••"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Demo: Use <strong>ash@pokemon.trainer</strong> with any password
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="glass border-border/50">
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                      Join the marketplace and start collecting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, name: e.target.value })
                          }
                          required
                          placeholder="Ash Ketchum"
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, email: e.target.value })
                          }
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          required
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-confirm">Confirm Password</Label>
                        <Input
                          id="register-confirm"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                          placeholder="••••••••"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero bg-gradient-mesh grain relative">
      <Header />
      <main className="container py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl border border-border/50 p-6 sm:p-8 mb-8 hover:border-primary/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card
              className="glass cursor-pointer hover:border-primary/50 transition-all duration-300 card-hover"
              onClick={() => navigate('/collection')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Collection</CardTitle>
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{user.collection.length}</p>
                <p className="text-xs text-muted-foreground">Cards owned</p>
              </CardContent>
            </Card>

            <Card
              className="glass cursor-pointer hover:border-primary/50 transition-all duration-300 card-hover"
              onClick={() => navigate('/watchlist')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Watchlist</CardTitle>
                  <Star className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{user.watchlist.length}</p>
                <p className="text-xs text-muted-foreground">Cards watching</p>
              </CardContent>
            </Card>

            <Card
              className="glass cursor-pointer hover:border-primary/50 transition-all duration-300 card-hover"
              onClick={() => navigate('/orders')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Orders</CardTitle>
                  <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Total orders</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your account and marketplace activities
                </CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => navigate('/collection')}>
                  View Collection
                </Button>
                <Button variant="outline" onClick={() => navigate('/sell')}>
                  Sell Cards
                </Button>
                <Button variant="outline" onClick={() => navigate('/watchlist')}>
                  Manage Watchlist
                </Button>
                <Button variant="outline" onClick={() => navigate('/orders')}>
                  Order History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
