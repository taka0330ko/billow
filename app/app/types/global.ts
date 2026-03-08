// TypeScriptに「windowにputerがある」ことを教えるための宣言ファイル

// window
//  └ puter
//     └ ai
//        └ chat()

declare global {
  interface Window {
    puter?: {
      ai?: {
        chat: (options: {
          messages: { role: "user" | "assistant" | "system"; content: string }[];
          model?: string;
        }) => Promise<{
          message?: {
            content?: string;
          };
        }>;
      };
    };
  }
}

export {};