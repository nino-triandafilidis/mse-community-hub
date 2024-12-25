from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import os
import time

def scrape_mse_courses():
    url = "https://bulletin.stanford.edu/departments/MGMTSCI/courses"
    
    # Setup Selenium WebDriver
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    
    try:
        # Wait for the table to load
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.ID, 'coursesTabContent'))
        )
        time.sleep(3)  # Ensure all data is loaded

        # Parse with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        driver.quit()
        
        courses = []
        course_rows = soup.select('#coursesTabContent tbody tr')
        
        for row in course_rows:
            course_link = row.find('a', href=True)
            code = course_link.text.strip() if course_link else ''
            
            cells = row.find_all('td')
            title = cells[0].text.strip() if len(cells) > 0 else ''
            description = cells[1].text.strip() if len(cells) > 1 else ''
            
            courses.append({
                'code': code,
                'name': title,
                'description': description
            })
        
        # Save to JSON
        os.makedirs('data', exist_ok=True)
        json_path = os.path.join('data', 'courses.json')
        
        with open(json_path, 'w') as f:
            json.dump(courses, f, indent=2)
        
        print(f"✅ Scraped {len(courses)} courses successfully!")
    
    except Exception as e:
        print(f"❌ An error occurred: {e}")
        driver.quit()

if __name__ == "__main__":
    scrape_mse_courses()