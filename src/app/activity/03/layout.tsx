


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return (
        
        <main className="box a3-main">
            
            {children}
        </main>
    );
  }