'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/supabase-api'

interface Profile {
  id: string
  username: string | null
  first_name: string | null
  last_name: string | null
  phone: string | null
  avatar: string | null
}

interface UserWithProfile extends User {
  username?: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: UserWithProfile | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = await getCurrentUser()
          setUser(userData)
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Error checking user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { user: authUser } = await signIn(email, password)
      if (authUser) {
        const userData = await getCurrentUser()
        setUser(userData)
      }
    } catch (error: any) {
      console.error('Erreur login:', error.message)
      throw new Error('Email ou mot de passe incorrect')
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const { user: authUser } = await signUp(email, password, username)
      if (authUser) {
        // Update profile with username
        await supabase
          .from('profiles')
          .update({ username })
          .eq('id', authUser.id)
        
        const userData = await getCurrentUser()
        setUser(userData)
      }
    } catch (error: any) {
      console.error('Erreur register:', error.message)
      throw new Error(error.message || 'Erreur lors de l\'inscription')
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Erreur logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a SupabaseAuthProvider')
  }
  return context
}
