import { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';

function BusinessDashboard() {
  const [loading, setLoading] = useState(true)
  const [avatar_url, setAvatarUrl] = useState(null)
  const pullUpRef = useRef(null);
  const handleRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use refs to store values that need to persist
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startTranslateRef = useRef(0);
  const initialPositionRef = useRef(0);

  useEffect(() => {
    const pullUpElement = pullUpRef.current;
    const handleElement = handleRef.current;

    if (!pullUpElement || !handleElement) return;

    // Calculate initial position once
    const pullUpHeight = pullUpElement.offsetHeight;
    const maxClosedPosition = window.innerHeight - 60; // How far down it can go (only handle visible)
    const initialPosition = window.innerHeight*.6; // Start fully open
    initialPositionRef.current = maxClosedPosition; // Store the max closed position for drag limits
    const topHeight = window.innerHeight*.3;

    
    // Set initial position
    pullUpElement.style.transform = `translateY(${initialPosition}px)`;
    pullUpElement.style.transition = 'transform 0.3s ease-out';

    const handleStart = (clientY) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      startYRef.current = clientY;
      
      // Get current translate value
      const computedStyle = window.getComputedStyle(pullUpElement);
      const transform = computedStyle.transform;
      
      if (transform === 'none') {
        startTranslateRef.current = initialPosition;
      } else {
        const matrix = transform.match(/matrix.*\((.+)\)/);
        if (matrix) {
          const values = matrix[1].split(', ');
          startTranslateRef.current = parseFloat(values[5] || initialPosition);
        } else {
          startTranslateRef.current = initialPosition;
        }
      }
      
      pullUpElement.style.transition = 'none';
    };

    const handleMove = (clientY) => {
      if (!isDraggingRef.current) return;

      const deltaY = clientY - startYRef.current;
      const newTranslate = Math.max(topHeight, Math.min(
        initialPositionRef.current, 
        startTranslateRef.current + deltaY
      ));
      
      pullUpElement.style.transform = `translateY(${newTranslate}px)`;
    };

    const handleEnd = () => {
      if (!isDraggingRef.current) return;
      
      isDraggingRef.current = false;
      setIsDragging(false);
      pullUpElement.style.transition = 'transform 0.3s ease-out';
      
      // No snapping - just keep it where it is
      // The position is already set by handleMove, so we don't need to do anything else
    };

    // Event handlers
    const handleMouseDown = (e) => {
      e.preventDefault();
      handleStart(e.clientY);
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleTouchStart = (e) => {
      handleStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Add event listeners
    handleElement.addEventListener('mousedown', handleMouseDown);
    handleElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      handleElement.removeEventListener('mousedown', handleMouseDown);
      handleElement.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()
    setLoading(true)
    const { user } = session
    const updates = {
      id: user.id,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }
    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
        <section className="bubbleContainer">
            <div className="businessBubble"></div>
            <div className="businessProfilePicture">
                <form onSubmit={updateProfile} className="businessProfileP">
                    <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(event, url) => {
                        updateProfile(event, url)
                    }}
                    />
                </form>
            </div>
            <div className="businessNavBubble bubbleOne"></div>
            <div className="businessNavBubble bubbleTwo"></div>
            <div className="businessNavBubble bubbleThree"></div>
            <div className="businessNavBubble bubbleFour"></div>
        </section>


        <section 
            ref={pullUpRef}
            className={`businessPullUp ${isDragging ? 'select-none' : ''}`}
        >
            <div 
            ref={handleRef}
            className="pullUpHandle"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            ></div>
        </section>
      
    </div>
  );
}

export default BusinessDashboard;