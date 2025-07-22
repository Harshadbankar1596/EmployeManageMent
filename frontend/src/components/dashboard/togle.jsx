import React from 'react';
import styled from 'styled-components';

const Switch = ({onClick, punchs}) => {

  const isChecked = punchs && punchs.length % 2 !== 0;

  return (
    <StyledWrapper>
      <div className="toggle-container">
        <div className="toggle-wrap">
          <input
            className="toggle-input"
            id="holo-toggle"
            type="checkbox"
            onClick={onClick}
            checked={isChecked}
            readOnly
          />
          <label className="toggle-track" htmlFor="holo-toggle">
            <div className="track-lines">
              <div className="track-line" />
            </div>
            <div className="toggle-thumb">
              <div className="thumb-core" />
              <div className="thumb-inner" />
              <div className="thumb-scan" />
              <div className="thumb-particles">
                <div className="thumb-particle" />
                <div className="thumb-particle" />
                <div className="thumb-particle" />
                <div className="thumb-particle" />
                <div className="thumb-particle" />
              </div>
            </div>
            <div className="toggle-data">
              <div className="data-text off">OFF</div>
              <div className="data-text on">ON</div>
              <div className="status-indicator off" />
              <div className="status-indicator on" />
            </div>
            <div className="energy-rings">
              <div className="energy-ring" />
              <div className="energy-ring" />
              <div className="energy-ring" />
            </div>
            <div className="interface-lines">
              <div className="interface-line" />
              <div className="interface-line" />
              <div className="interface-line" />
              <div className="interface-line" />
              <div className="interface-line" />
              <div className="interface-line" />
            </div>
            <div className="toggle-reflection" />
            <div className="holo-glow" />
          </label>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-container {
    position: relative;
    width: 90px; /* chota kiya */
    display: flex;
    flex-direction: column;
    align-items: center;
    perspective: 800px;
    z-index: 5;
  }

  .toggle-wrap {
    position: relative;
    width: 100%;
    height: 38px; /* chota kiya */
    transform-style: preserve-3d;
  }

  .toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-track {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fee2e2; /* red-100 for subtle off bg */
    border-radius: 19px; /* chota kiya */
    cursor: pointer;
    /* box-shadow removed */
    overflow: hidden;
    backdrop-filter: blur(5px);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1.2px solid #ef4444; /* red-500 */
  }

  .toggle-track::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .toggle-track::after {
    content: "";
    position: absolute;
    top: 1.2px;
    left: 1.2px;
    right: 1.2px;
    height: 6px;
    background: #fecaca; /* red-200 */
    border-radius: 19px 19px 0 0;
    opacity: 0.7;
    filter: blur(0.7px);
  }

  .track-lines {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: translateY(-50%);
    overflow: hidden;
  }

  .track-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      90deg,
      #ef4444 0px,
      #ef4444 3px,
      transparent 3px,
      transparent 9px
    );
    animation: track-line-move 3s linear infinite;
    opacity: 0.3;
  }

  @keyframes track-line-move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(12px);
    }
  }

  .toggle-thumb {
    position: absolute;
    width: 32px;
    height: 32px;
    left: 2px;
    top: 2px;
    background: #ef4444; /* red-500 */
    border-radius: 50%;
    /* box-shadow removed */
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 2;
    border: 1.2px solid #ef4444; /* red-500 */
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .thumb-core {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f87171; /* red-400 */
    border-radius: 50%;
    /* box-shadow removed */
    opacity: 0.9;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .thumb-inner {
    position: absolute;
    width: 13px;
    height: 13px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fca5a5; /* red-300 */
    border-radius: 50%;
    /* box-shadow removed */
    opacity: 0.7;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    animation: pulse 2s infinite alternate;
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(0.9);
    }
    100% {
      opacity: 0.8;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  .thumb-scan {
    position: absolute;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      #ef4444 20%,
      #fca5a5 50%,
      #ef4444 80%,
      rgba(0, 0, 0, 0) 100%
    );
    top: 0;
    left: 0;
    filter: blur(0.7px);
    animation: thumb-scan 2s linear infinite;
    opacity: 0.7;
  }

  @keyframes thumb-scan {
    0% {
      top: -3px;
      opacity: 0;
    }
    20% {
      opacity: 0.7;
    }
    80% {
      opacity: 0.7;
    }
    100% {
      top: 32px;
      opacity: 0;
    }
  }

  .thumb-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .thumb-particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fca5a5; /* red-300 */
    border-radius: 50%;
    /* box-shadow removed */
    animation: thumb-particle-float 3s infinite ease-out;
    opacity: 0;
  }

  .thumb-particle:nth-child(1) {
    top: 70%;
    left: 30%;
    animation-delay: 0.2s;
  }

  .thumb-particle:nth-child(2) {
    top: 60%;
    left: 60%;
    animation-delay: 0.6s;
  }

  .thumb-particle:nth-child(3) {
    top: 50%;
    left: 40%;
    animation-delay: 1s;
  }

  .thumb-particle:nth-child(4) {
    top: 40%;
    left: 70%;
    animation-delay: 1.4s;
  }

  .thumb-particle:nth-child(5) {
    top: 80%;
    left: 50%;
    animation-delay: 1.8s;
  }

  @keyframes thumb-particle-float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-18px) scale(0);
      opacity: 0;
    }
  }

  .toggle-data {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .data-text {
    position: absolute;
    font-size: 9px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.5s ease;
  }

  .data-text.off {
    right: 7px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 1;
    color: #ef4444; /* red-500 */
    text-shadow: none;
  }

  .data-text.on {
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    color: #22c55e; /* green-500 */
    text-shadow: none;
  }

  .status-indicator {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ef4444; /* red-500 */
    /* box-shadow removed */
    animation: blink 2s infinite alternate;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .status-indicator.off {
    top: 14px;
    right: 8px;
    opacity: 1;
    background: #ef4444; /* red-500 */
  }

  .status-indicator.on {
    top: 14px;
    left: 8px;
    opacity: 0;
    background: #22c55e; /* green-500 */
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .energy-rings {
    position: absolute;
    width: 32px;
    height: 32px;
    left: 2px;
    top: 2px;
    pointer-events: none;
    z-index: 1;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .energy-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1.2px solid transparent;
    opacity: 0;
  }

  .energy-ring:nth-child(1) {
    width: 29px;
    height: 29px;
    border-top-color: #ef4444;
    border-right-color: #f87171;
    animation: spin 3s linear infinite;
  }

  .energy-ring:nth-child(2) {
    width: 23px;
    height: 23px;
    border-bottom-color: #ef4444;
    border-left-color: #f87171;
    animation: spin 2s linear infinite reverse;
  }

  .energy-ring:nth-child(3) {
    width: 17px;
    height: 17px;
    border-left-color: #ef4444;
    border-top-color: #f87171;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .interface-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .interface-line {
    position: absolute;
    background: #ef4444;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.3;
  }

  .interface-line:nth-child(1) {
    width: 8px;
    height: 1px;
    bottom: -3px;
    left: 12px;
  }

  .interface-line:nth-child(2) {
    width: 1px;
    height: 5px;
    bottom: -7px;
    left: 20px;
  }

  .interface-line:nth-child(3) {
    width: 13px;
    height: 1px;
    bottom: -7px;
    left: 20px;
  }

  .interface-line:nth-child(4) {
    width: 8px;
    height: 1px;
    bottom: -3px;
    right: 12px;
  }

  .interface-line:nth-child(5) {
    width: 1px;
    height: 5px;
    bottom: -7px;
    right: 20px;
  }

  .interface-line:nth-child(6) {
    width: 13px;
    height: 1px;
    bottom: -7px;
    right: 6px;
  }

  .toggle-reflection {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: none;
    border-radius: 19px;
    pointer-events: none;
  }

  .toggle-label {
    position: relative;
    margin-top: 12px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    color: #ef4444;
    text-shadow: none;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .holo-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 19px;
    background: #fee2e2; /* red-100 */
    filter: blur(6px);
    opacity: 0.5;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 0;
  }

  /* ON STATE (green-500 theme) */
  .toggle-input:checked + .toggle-track {
    background: #dcfce7; /* green-100 */
    border-color: #22c55e; /* green-500 */
    /* box-shadow removed */
  }

  .toggle-input:checked + .toggle-track::before {
    background: none;
    opacity: 0;
  }

  .toggle-input:checked + .toggle-track::after {
    background: #bbf7d0; /* green-200 */
  }

  .toggle-input:checked + .toggle-track .track-line {
    background: repeating-linear-gradient(
      90deg,
      #22c55e 0px,
      #22c55e 3px,
      transparent 3px,
      transparent 9px
    );
    animation-direction: reverse;
    opacity: 0.3;
  }

  .toggle-input:checked + .toggle-track .toggle-thumb {
    left: calc(100% - 34px);
    background: #22c55e; /* green-500 */
    border-color: #22c55e;
    /* box-shadow removed */
  }

  .toggle-input:checked + .toggle-track .thumb-core {
    background: #4ade80; /* green-400 */
    /* box-shadow removed */
  }

  .toggle-input:checked + .toggle-track .thumb-inner {
    background: #86efac; /* green-300 */
    /* box-shadow removed */
  }

  .toggle-input:checked + .toggle-track .thumb-scan {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      #22c55e 20%,
      #bbf7d0 50%,
      #22c55e 80%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .toggle-input:checked + .toggle-track .thumb-particle {
    background: #bbf7d0; /* green-200 */
    /* box-shadow removed */
  }

  .toggle-input:checked + .toggle-track .data-text.off {
    opacity: 0;
  }

  .toggle-input:checked + .toggle-track .data-text.on {
    opacity: 1;
  }

  .toggle-input:checked + .toggle-track .status-indicator.off {
    opacity: 0;
  }

  .toggle-input:checked + .toggle-track .status-indicator.on {
    opacity: 1;
    background: #22c55e; /* green-500 */
  }

  .toggle-input:checked + .toggle-track .energy-rings {
    left: calc(100% - 34px);
  }

  .toggle-input:checked + .toggle-track .energy-ring {
    opacity: 1;
  }

  .toggle-input:checked + .toggle-track .energy-ring:nth-child(1) {
    border-top-color: #22c55e;
    border-right-color: #4ade80;
  }

  .toggle-input:checked + .toggle-track .energy-ring:nth-child(2) {
    border-bottom-color: #22c55e;
    border-left-color: #4ade80;
  }

  .toggle-input:checked + .toggle-track .energy-ring:nth-child(3) {
    border-left-color: #22c55e;
    border-top-color: #4ade80;
  }

  .toggle-input:checked + .toggle-track .interface-line {
    background: #22c55e;
    opacity: 0.3;
  }

  .toggle-input:checked ~ .toggle-label {
    color: #22c55e;
    text-shadow: none;
  }

  .toggle-input:checked + .toggle-track .holo-glow {
    background: #dcfce7; /* green-100 */
  }

  .toggle-input:hover + .toggle-track {
    /* box-shadow removed */
  }

  .toggle-input:checked:hover + .toggle-track {
    /* box-shadow removed */
  }
`;

export default Switch;
// import React from 'react';
// import styled from 'styled-components';

// const Switch = ({onClick, punchs}) => {

//   const isChecked = punchs && punchs.length % 2 !== 0;

//   return (
//     <StyledWrapper>
//       <div className="toggle-container">
//         <div className="toggle-wrap">
//           <input
//             className="toggle-input"
//             id="holo-toggle"
//             type="checkbox"
//             onClick={onClick}
//             checked={isChecked}
//             readOnly
//           />
//           <label className="toggle-track" htmlFor="holo-toggle">
//             <div className="track-lines">
//               <div className="track-line" />
//             </div>
//             <div className="toggle-thumb">
//               <div className="thumb-core" />
//               <div className="thumb-inner" />
//               <div className="thumb-scan" />
//               <div className="thumb-particles">
//                 <div className="thumb-particle" />
//                 <div className="thumb-particle" />
//                 <div className="thumb-particle" />
//                 <div className="thumb-particle" />
//                 <div className="thumb-particle" />
//               </div>
//             </div>
//             <div className="toggle-data">
//               <div className="data-text off">OFF</div>
//               <div className="data-text on">ON</div>
//               <div className="status-indicator off" />
//               <div className="status-indicator on" />
//             </div>
//             <div className="energy-rings">
//               <div className="energy-ring" />
//               <div className="energy-ring" />
//               <div className="energy-ring" />
//             </div>
//             <div className="interface-lines">
//               <div className="interface-line" />
//               <div className="interface-line" />
//               <div className="interface-line" />
//               <div className="interface-line" />
//               <div className="interface-line" />
//               <div className="interface-line" />
//             </div>
//             <div className="toggle-reflection" />
//             <div className="holo-glow" />
//           </label>
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .toggle-container {
//     position: relative;
//     width: 140px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     perspective: 800px;
//     z-index: 5;
//   }

//   .toggle-wrap {
//     position: relative;
//     width: 100%;
//     height: 60px;
//     transform-style: preserve-3d;
//   }

//   .toggle-input {
//     position: absolute;
//     opacity: 0;
//     width: 0;
//     height: 0;
//   }

//   .toggle-track {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background: #fee2e2; /* red-100 for subtle off bg */
//     border-radius: 30px;
//     cursor: pointer;
//     /* box-shadow removed */
//     overflow: hidden;
//     backdrop-filter: blur(5px);
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//     border: 1.5px solid #ef4444; /* red-500 */
//   }

//   .toggle-track::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: none;
//     opacity: 0;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//   }

//   .toggle-track::after {
//     content: "";
//     position: absolute;
//     top: 2px;
//     left: 2px;
//     right: 2px;
//     height: 10px;
//     background: #fecaca; /* red-200 */
//     border-radius: 30px 30px 0 0;
//     opacity: 0.7;
//     filter: blur(1px);
//   }

//   .track-lines {
//     position: absolute;
//     top: 50%;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     transform: translateY(-50%);
//     overflow: hidden;
//   }

//   .track-line {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: repeating-linear-gradient(
//       90deg,
//       #ef4444 0px,
//       #ef4444 5px,
//       transparent 5px,
//       transparent 15px
//     );
//     animation: track-line-move 3s linear infinite;
//     opacity: 0.3;
//   }

//   @keyframes track-line-move {
//     0% {
//       transform: translateX(0);
//     }
//     100% {
//       transform: translateX(20px);
//     }
//   }

//   .toggle-thumb {
//     position: absolute;
//     width: 54px;
//     height: 54px;
//     left: 3px;
//     top: 3px;
//     background: #ef4444; /* red-500 */
//     border-radius: 50%;
//     /* box-shadow removed */
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//     z-index: 2;
//     border: 2px solid #ef4444; /* red-500 */
//     overflow: hidden;
//     transform-style: preserve-3d;
//   }

//   .thumb-core {
//     position: absolute;
//     width: 40px;
//     height: 40px;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background: #f87171; /* red-400 */
//     border-radius: 50%;
//     /* box-shadow removed */
//     opacity: 0.9;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//   }

//   .thumb-inner {
//     position: absolute;
//     width: 25px;
//     height: 25px;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background: #fca5a5; /* red-300 */
//     border-radius: 50%;
//     /* box-shadow removed */
//     opacity: 0.7;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//     animation: pulse 2s infinite alternate;
//   }

//   @keyframes pulse {
//     0% {
//       opacity: 0.5;
//       transform: translate(-50%, -50%) scale(0.9);
//     }
//     100% {
//       opacity: 0.8;
//       transform: translate(-50%, -50%) scale(1.1);
//     }
//   }

//   .thumb-scan {
//     position: absolute;
//     width: 100%;
//     height: 5px;
//     background: linear-gradient(
//       90deg,
//       rgba(0, 0, 0, 0) 0%,
//       #ef4444 20%,
//       #fca5a5 50%,
//       #ef4444 80%,
//       rgba(0, 0, 0, 0) 100%
//     );
//     top: 0;
//     left: 0;
//     filter: blur(1px);
//     animation: thumb-scan 2s linear infinite;
//     opacity: 0.7;
//   }

//   @keyframes thumb-scan {
//     0% {
//       top: -5px;
//       opacity: 0;
//     }
//     20% {
//       opacity: 0.7;
//     }
//     80% {
//       opacity: 0.7;
//     }
//     100% {
//       top: 54px;
//       opacity: 0;
//     }
//   }

//   .thumb-particles {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     overflow: hidden;
//   }

//   .thumb-particle {
//     position: absolute;
//     width: 3px;
//     height: 3px;
//     background: #fca5a5; /* red-300 */
//     border-radius: 50%;
//     /* box-shadow removed */
//     animation: thumb-particle-float 3s infinite ease-out;
//     opacity: 0;
//   }

//   .thumb-particle:nth-child(1) {
//     top: 70%;
//     left: 30%;
//     animation-delay: 0.2s;
//   }

//   .thumb-particle:nth-child(2) {
//     top: 60%;
//     left: 60%;
//     animation-delay: 0.6s;
//   }

//   .thumb-particle:nth-child(3) {
//     top: 50%;
//     left: 40%;
//     animation-delay: 1s;
//   }

//   .thumb-particle:nth-child(4) {
//     top: 40%;
//     left: 70%;
//     animation-delay: 1.4s;
//   }

//   .thumb-particle:nth-child(5) {
//     top: 80%;
//     left: 50%;
//     animation-delay: 1.8s;
//   }

//   @keyframes thumb-particle-float {
//     0% {
//       transform: translateY(0) scale(1);
//       opacity: 0;
//     }
//     20% {
//       opacity: 0.8;
//     }
//     100% {
//       transform: translateY(-30px) scale(0);
//       opacity: 0;
//     }
//   }

//   .toggle-data {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     z-index: 1;
//   }

//   .data-text {
//     position: absolute;
//     font-size: 12px;
//     font-weight: 500;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//     transition: all 0.5s ease;
//   }

//   .data-text.off {
//     right: 12px;
//     top: 50%;
//     transform: translateY(-50%);
//     opacity: 1;
//     color: #ef4444; /* red-500 */
//     text-shadow: none;
//   }

//   .data-text.on {
//     left: 15px;
//     top: 50%;
//     transform: translateY(-50%);
//     opacity: 0;
//     color: #22c55e; /* green-500 */
//     text-shadow: none;
//   }

//   .status-indicator {
//     position: absolute;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background: #ef4444; /* red-500 */
//     /* box-shadow removed */
//     animation: blink 2s infinite alternate;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//   }

//   .status-indicator.off {
//     top: 25px;
//     right: 15px;
//     opacity: 1;
//     background: #ef4444; /* red-500 */
//   }

//   .status-indicator.on {
//     top: 25px;
//     left: 15px;
//     opacity: 0;
//     background: #22c55e; /* green-500 */
//   }

//   @keyframes blink {
//     0%,
//     100% {
//       opacity: 0.5;
//       transform: scale(0.9);
//     }
//     50% {
//       opacity: 1;
//       transform: scale(1.1);
//     }
//   }

//   .energy-rings {
//     position: absolute;
//     width: 54px;
//     height: 54px;
//     left: 3px;
//     top: 3px;
//     pointer-events: none;
//     z-index: 1;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//   }

//   .energy-ring {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border-radius: 50%;
//     border: 2px solid transparent;
//     opacity: 0;
//   }

//   .energy-ring:nth-child(1) {
//     width: 50px;
//     height: 50px;
//     border-top-color: #ef4444;
//     border-right-color: #f87171;
//     animation: spin 3s linear infinite;
//   }

//   .energy-ring:nth-child(2) {
//     width: 40px;
//     height: 40px;
//     border-bottom-color: #ef4444;
//     border-left-color: #f87171;
//     animation: spin 2s linear infinite reverse;
//   }

//   .energy-ring:nth-child(3) {
//     width: 30px;
//     height: 30px;
//     border-left-color: #ef4444;
//     border-top-color: #f87171;
//     animation: spin 1.5s linear infinite;
//   }

//   @keyframes spin {
//     0% {
//       transform: translate(-50%, -50%) rotate(0deg);
//     }
//     100% {
//       transform: translate(-50%, -50%) rotate(360deg);
//     }
//   }

//   .interface-lines {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     pointer-events: none;
//   }

//   .interface-line {
//     position: absolute;
//     background: #ef4444;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//     opacity: 0.3;
//   }

//   .interface-line:nth-child(1) {
//     width: 15px;
//     height: 1px;
//     bottom: -5px;
//     left: 20px;
//   }

//   .interface-line:nth-child(2) {
//     width: 1px;
//     height: 8px;
//     bottom: -12px;
//     left: 35px;
//   }

//   .interface-line:nth-child(3) {
//     width: 25px;
//     height: 1px;
//     bottom: -12px;
//     left: 35px;
//   }

//   .interface-line:nth-child(4) {
//     width: 15px;
//     height: 1px;
//     bottom: -5px;
//     right: 20px;
//   }

//   .interface-line:nth-child(5) {
//     width: 1px;
//     height: 8px;
//     bottom: -12px;
//     right: 35px;
//   }

//   .interface-line:nth-child(6) {
//     width: 25px;
//     height: 1px;
//     bottom: -12px;
//     right: 10px;
//   }

//   .toggle-reflection {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background: none;
//     border-radius: 30px;
//     pointer-events: none;
//   }

//   .toggle-label {
//     position: relative;
//     margin-top: 20px;
//     font-size: 14px;
//     text-transform: uppercase;
//     letter-spacing: 2px;
//     text-align: center;
//     color: #ef4444;
//     text-shadow: none;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//   }

//   .holo-glow {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     border-radius: 30px;
//     background: #fee2e2; /* red-100 */
//     filter: blur(10px);
//     opacity: 0.5;
//     transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
//     z-index: 0;
//   }

//   /* ON STATE (green-500 theme) */
//   .toggle-input:checked + .toggle-track {
//     background: #dcfce7; /* green-100 */
//     border-color: #22c55e; /* green-500 */
//     /* box-shadow removed */
//   }

//   .toggle-input:checked + .toggle-track::before {
//     background: none;
//     opacity: 0;
//   }

//   .toggle-input:checked + .toggle-track::after {
//     background: #bbf7d0; /* green-200 */
//   }

//   .toggle-input:checked + .toggle-track .track-line {
//     background: repeating-linear-gradient(
//       90deg,
//       #22c55e 0px,
//       #22c55e 5px,
//       transparent 5px,
//       transparent 15px
//     );
//     animation-direction: reverse;
//     opacity: 0.3;
//   }

//   .toggle-input:checked + .toggle-track .toggle-thumb {
//     left: calc(100% - 57px);
//     background: #22c55e; /* green-500 */
//     border-color: #22c55e;
//     /* box-shadow removed */
//   }

//   .toggle-input:checked + .toggle-track .thumb-core {
//     background: #4ade80; /* green-400 */
//     /* box-shadow removed */
//   }

//   .toggle-input:checked + .toggle-track .thumb-inner {
//     background: #86efac; /* green-300 */
//     /* box-shadow removed */
//   }

//   .toggle-input:checked + .toggle-track .thumb-scan {
//     background: linear-gradient(
//       90deg,
//       rgba(0, 0, 0, 0) 0%,
//       #22c55e 20%,
//       #bbf7d0 50%,
//       #22c55e 80%,
//       rgba(0, 0, 0, 0) 100%
//     );
//   }

//   .toggle-input:checked + .toggle-track .thumb-particle {
//     background: #bbf7d0; /* green-200 */
//     /* box-shadow removed */
//   }

//   .toggle-input:checked + .toggle-track .data-text.off {
//     opacity: 0;
//   }

//   .toggle-input:checked + .toggle-track .data-text.on {
//     opacity: 1;
//   }

//   .toggle-input:checked + .toggle-track .status-indicator.off {
//     opacity: 0;
//   }

//   .toggle-input:checked + .toggle-track .status-indicator.on {
//     opacity: 1;
//     background: #22c55e; /* green-500 */
//   }

//   .toggle-input:checked + .toggle-track .energy-rings {
//     left: calc(100% - 57px);
//   }

//   .toggle-input:checked + .toggle-track .energy-ring {
//     opacity: 1;
//   }

//   .toggle-input:checked + .toggle-track .energy-ring:nth-child(1) {
//     border-top-color: #22c55e;
//     border-right-color: #4ade80;
//   }

//   .toggle-input:checked + .toggle-track .energy-ring:nth-child(2) {
//     border-bottom-color: #22c55e;
//     border-left-color: #4ade80;
//   }

//   .toggle-input:checked + .toggle-track .energy-ring:nth-child(3) {
//     border-left-color: #22c55e;
//     border-top-color: #4ade80;
//   }

//   .toggle-input:checked + .toggle-track .interface-line {
//     background: #22c55e;
//     opacity: 0.3;
//   }

//   .toggle-input:checked ~ .toggle-label {
//     color: #22c55e;
//     text-shadow: none;
//   }

//   .toggle-input:checked + .toggle-track .holo-glow {
//     background: #dcfce7; /* green-100 */
//   }

//   .toggle-input:hover + .toggle-track {
//     /* box-shadow removed */
//   }

//   .toggle-input:checked:hover + .toggle-track {
//     /* box-shadow removed */
//   }
// `;

// export default Switch;
