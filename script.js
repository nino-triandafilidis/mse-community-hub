let courseData = [];

// Load course data
fetch('data/courses.json')
    .then(response => response.json())
    .then(data => {
        courseData = data;
    });

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
    // Use courseData instead of hardcoded courses
    const matchedCourses = courseData.filter(course => 
        course.description.toLowerCase().includes(interests.toLowerCase())
    ).slice(0, 2);  // Get top 2 matches
    
    return `Based on your interest in ${interests}, you might enjoy:<br>
            ${matchedCourses.map(course => `• ${course.code}: ${course.name}`).join('<br>')}`;
} 