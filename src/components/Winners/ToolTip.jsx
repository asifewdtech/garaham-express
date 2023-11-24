import React, { useState, useRef, useEffect } from 'react';

const CustomTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipRef = useRef(null);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  useEffect(() => {
    function adjustTooltipPosition() {
      const tooltip = tooltipRef.current;

      if (tooltip) {
        const rect = tooltip.getBoundingClientRect();

        if (rect.left < 0) {
          tooltip.style.left = '0';
        } 


        const viewportWidth = window.innerWidth;
        if (rect.right > viewportWidth) {
            // alert ()
          tooltip.style.left = 0 + 'px';
        }
      }
    }

    if (isTooltipVisible) {
      window.addEventListener('resize', adjustTooltipPosition);
      adjustTooltipPosition();
    } else {
      window.removeEventListener('resize', adjustTooltipPosition);
    }

    return () => {
      window.removeEventListener('resize', adjustTooltipPosition);
    };
  }, [isTooltipVisible]);

  return (
    <div
      className="tooltip-container ellipseimg"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <div className="ellipse-img">
        <img className="mainImg" src="/ellipse.png" alt="Tooltip Trigger" />
      </div>
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="custom-tooltip custom-text tooltipImg custom-select"
        >
          Among the whole list, there were 7 entries of @saramarshall user.
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
