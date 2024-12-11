interface Window {
  FB: {
    init(options: {
      appId: string
      cookie?: boolean
      xfbml?: boolean
      version: string
    }): void
    login(
      callback: (response: FB.StatusResponse) => void,
      options?: { scope: string }
    ): void
    logout(callback: () => void): void
    getLoginStatus(callback: (response: FB.StatusResponse) => void): void
    AppEvents: {
      logPageView(): void
    }
  }
  fbAsyncInit?: () => void
}

declare namespace FB {
  interface StatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown'
    authResponse: {
      accessToken: string
      expiresIn: number
      signedRequest: string
      userID: string
    } | null
  }
}
