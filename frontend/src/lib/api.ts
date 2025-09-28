// API 配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bangai-service-1072717545080.us-central1.run.app'

export interface ChatRequest {
  input: string
}

export interface ChatResponse {
  response: string
}

// 发送聊天消息到后端
export async function sendChatMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: message }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ChatResponse = await response.json()
    return data.response
  } catch (error) {
    console.error('API调用失败:', error)
    throw new Error('无法连接到聊天服务，请检查后端是否正常运行')
  }
}

// 检查后端服务状态
export async function checkServerStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`)
    return response.ok
  } catch (error) {
    return false
  }
}
