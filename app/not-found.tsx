export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Página no encontrada</h2>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#ff6b35',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: 'bold'
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}