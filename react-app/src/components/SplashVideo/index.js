import './SplashVideo.css'


function SplashVideo() {

    return (
        <div className='video-container'>
            <video autoPlay loop muted preload="auto" playsInline>
                <source src="https://www.brainscape.com/assets/cms/public-views/shared/mobile-animation.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video >
            <div className='video-captions-container'>
                <div className='video-captions-header'>
                    Attack<br />
                    your weaknesses.

                    <div className='video-captions-subheader'>
                        Smarter-Maker's online flashcards optimize your studying, by repeating harder concepts in the perfect interval for maximum memory retention.
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SplashVideo
