// 引入 Supabase 客戶端
import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客戶端
const supabaseUrl = 'https://your-supabase-url.supabase.co'
const supabaseKey = 'your-supabase-key'
const supabase = createClient(supabaseUrl, supabaseKey)

// 註冊功能
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    console.error('Error signing up:', error.message)
    return { success: false, message: error.message }
  }

  console.log('User signed up:', user)
  return { success: true, message: 'User signed up successfully', user: user }
}

// 測試註冊功能
signUp('test@example.com', 'password123').then(response => {
  console.log(response)
})