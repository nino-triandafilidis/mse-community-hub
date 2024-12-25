function handleSubmit(event) {
    event.preventDefault();
    
    // Hide previous results and show loading
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    // Simulate backend processing
    setTimeout(() => {
        const interests = document.getElementById('interests').value;
        const recommendations = generateMockRecommendations(interests);
        
        // Display results
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('recommendation-text').innerHTML = recommendations;
    }, 2000);
}

function generateMockRecommendations(interests) {
    const courses = [
        'MS&E 234: Data-Driven Decision Making',
        'MS&E 226: Operations Management',
        'MS&E 251: Stochastic Decision Models',
        'MS&E 245A: Investment Science'
    ];
    
    return `Based on your interest in ${interests}, you might enjoy:<br>
            • ${courses[Math.floor(Math.random() * 2)]}<br>
            • ${courses[Math.floor(Math.random() * 2) + 2]}`;
} 