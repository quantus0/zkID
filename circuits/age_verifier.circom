pragma circom 2.0.0;

template AgeVerifier() {
    signal input age;           // Private input: user's age
    signal input threshold;     // Public input: minimum age (e.g., 18)
    signal output isAbove;      // Output: 1 if age >= threshold, 0 otherwise

    // Ensure age is valid (non-negative)
    assert(age >= 0);

    // Compute if age is above threshold
    isAbove <== age >= threshold ? 1 : 0;
}

component main {public [threshold]} = AgeVerifier();
