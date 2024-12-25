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
    console.log('Full course data:', courseData); // Log all available courses
    console.log('Searching for:', interests); // Log search term

    // Add some debugging for the first few courses
    if (courseData && courseData.length > 0) {
        console.log('Sample course description:', courseData[0].description);
        console.log('Is match?', courseData[0].description.toLowerCase().includes(interests.toLowerCase()));
    }

    const matchedCourses = courseData.filter(course => {
        // Make sure both course.description and interests exist and are strings
        if (!course.description || !interests) return false;
        
        const desc = course.description.toLowerCase().trim();
        const search = interests.toLowerCase().trim();
        const isMatch = desc.includes(search);
        
        console.log(`Checking course ${course.code}: ${isMatch}`); // Log each check
        return isMatch;
    }).slice(0, 4);  // Get top 4 matches
    
    console.log('Matched courses:', matchedCourses);
    
    if (matchedCourses.length === 0) {
        return `<p>No courses match your interests in "${interests}". 
                Please try different keywords or browse the full course catalog <a href="https://bulletin.stanford.edu/departments/MGMTSCI/courses" target="_blank">here</a>.</p>`;
    }
    
    return `Based on your interest in "${interests}", you might enjoy:<br>
            ${matchedCourses.map(course => `• ${course.code}: ${course.name}`).join('<br>')}`;
} 