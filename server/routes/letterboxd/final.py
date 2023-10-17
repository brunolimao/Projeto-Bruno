import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import sys

class CustomPythonError(Exception):
  pass

#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together4(filmes):
  try:

    options = Options()

    options = webdriver.FirefoxOptions()
    options.add_argument("-headless")

    driver = webdriver.Firefox(options=options)

    for filme in filmes:
    
      driver.get("https://letterboxd.com/" + filme + "/genres")
      nome = driver.find_element(By.CLASS_NAME, "headline-1").text
      tempo = driver.find_element(By.CLASS_NAME, "text-footer").text
      tempo = tempo.replace(" More at IMDB TMDB","")
      genres = ""
      generos = driver.find_elements(By.CLASS_NAME, "capitalize")
      generos_epecificos = generos[0].find_elements(By.CSS_SELECTOR, "a.text-slug")
      for idx, genero in enumerate(generos_epecificos):
        if idx != len(generos_epecificos)-1:
          genres = genres + genero.text + ", "
        else:
          genres = genres + genero.text
      time.sleep(2)
      imagem = driver.find_element(By.CSS_SELECTOR, "a#poster-zoom")
      linkImagem = imagem.find_element(By.CSS_SELECTOR, "img").get_attribute('src')
      nota = driver.find_element(By.CLASS_NAME, "display-rating").text
      link = "https://letterboxd.com" + filme
      print(nome + " | " + nota + " | " + genres + " | " + link + " | " + linkImagem + " | " + tempo)
  except NoSuchElementException as e:
    raise CustomPythonError("Erro: Elemento nao encontrado")
  except Exception:
    raise CustomPythonError("Erro desconhecido")
    
  driver.close()

def main():

  filmes1 = sys.argv[1]
  filmes = filmes1.split(",")
  get_watchlist_together4(filmes)
  
  


if __name__ =='__main__' :
  main()