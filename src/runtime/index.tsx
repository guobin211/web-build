const config: Record<string, string> = {
  NODE_ENV: process.env.NODE_ENV || 'development',
}

export function defineConfig(key: string, value: string) {
  config[key] = value
}

export function getConfig(key: string) {
  return config[key]
}
