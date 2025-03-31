
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/types/auth";

export const useAuthApi = () => {
  const { toast } = useToast();

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log("Starting sign up process");

      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        console.error("Sign up error:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      console.log("Sign up successful:", data);

      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
      
      return data;
    } catch (error: any) {
      console.error("Sign up exception:", error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        console.error("Google sign in error:", error);
        toast({
          title: "Google login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
    } catch (error: any) {
      console.error("Google sign in exception:", error);
      toast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Password reset email sent",
        description: "Check your email for a password reset link.",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return {
    fetchProfile,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword
  };
};
