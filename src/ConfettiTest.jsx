import { useConfetti } from './Confetti';
import './ConfettiTest.css';

const ConfettiTest = () => {
    const { triggerConfetti, ConfettiComponent } = useConfetti();

    return (
        <div className="confetti-test">
            <h2>Confetti Test</h2>
            <button
                className="test-button"
                onClick={triggerConfetti}
            >
                🎉 Test Confetti!
            </button>
            <ConfettiComponent />
        </div>
    );
};

export default ConfettiTest;
