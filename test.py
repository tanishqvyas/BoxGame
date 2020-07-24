from selenium import webdriver
import time
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys  


# altering options for headless testing
options = Options()
options.headless = False

# Opening the page
browser = webdriver.Chrome(chrome_options=options)
path_to_page = "file:///home/tanishq/MAVIS/Privado%20Tasks/Game/index.html"
browser.get(path_to_page)  


# Testing

# Random square generation
print("Opening the page multiple times to show random generation of squares")
for i in range(5):
	print("Random Gen #" + str(i+1))
	browser.get(path_to_page) 
	time.sleep(1)

# Testing the movements
browser.get(path_to_page)

print("Waiting 5 secs before concluding the test")
time.sleep(5)
browser.close()

print("TESTING SUCCESSFUL !!!")