export default function BuiltWith() {
  return (
    <div className="ms-bw">
      <div className="ms-bw-lab">Made with</div>
      <div className="ms-bw-items">
        <div className="ms-bw-item">
          <span className="ms-app-ico" style={{ background: '#D97757' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none">
              <path d="M12 3.6v16.8M3.6 12h16.8M6.1 6.1l11.8 11.8M17.9 6.1 6.1 17.9M8.7 4.2l6.6 15.6M4.2 8.7l15.6 6.6M4.2 15.3 19.8 8.7M8.7 19.8 15.3 4.2"/>
            </svg>
          </span>
        </div>
        <div className="ms-bw-item">
          <span className="ms-app-ico" style={{ background: '#0f1724' }}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="12" r="2.15" fill="#61DAFB"/>
              <g fill="none" stroke="#61DAFB" strokeWidth="1.15">
                <ellipse cx="12" cy="12" rx="9.4" ry="3.9"/>
                <ellipse cx="12" cy="12" rx="9.4" ry="3.9" transform="rotate(60 12 12)"/>
                <ellipse cx="12" cy="12" rx="9.4" ry="3.9" transform="rotate(120 12 12)"/>
              </g>
            </svg>
          </span>
        </div>
        <div className="ms-bw-item">
          <span className="ms-app-ico" style={{ background: '#fff' }}>
            <svg viewBox="0 0 12 18" width="15" height="22">
              <path d="M3 0h3v6H3a3 3 0 0 1 0-6Z" fill="#F24E1E"/>
              <path d="M6 0h3a3 3 0 0 1 0 6H6V0Z" fill="#A259FF"/>
              <path d="M3 6h3v6H3a3 3 0 0 1 0-6Z" fill="#FF7262"/>
              <circle cx="9" cy="9" r="3" fill="#1ABCFE"/>
              <path d="M6 12v3a3 3 0 1 1-3-3h3Z" fill="#0ACF83"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
