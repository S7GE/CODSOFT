const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const action = button.getAttribute('data-action');

        if (value) {
            // Prevent multiple decimals
            if (value === '.' && currentInput.includes('.')) return;
            
            // Handle input appending
            currentInput += value;
            display.value = currentInput;
        }

        if (action === 'clear') {
            currentInput = '';
            display.value = '0';
        }

        if (action === 'delete') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput || '0';
        }

        if (action === 'calculate') {
            try {
                if (currentInput) {
                    const result = eval(currentInput);
                    // Round to avoid floating-point issues
                    display.value = Math.round(result * 100000000) / 100000000;
                    currentInput = display.value.toString();
                }
            } catch (error) {
                display.value = 'Error';
                currentInput = '';
            }
        }
    });
});

