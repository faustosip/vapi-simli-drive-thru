'use client';

export default function Error({ error, reset }) {
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
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>Error</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>Algo salió mal</h2>
        <button
          onClick={reset}
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#ff6b35',
            border: 'none',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Intentar de nuevo
        </button>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
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