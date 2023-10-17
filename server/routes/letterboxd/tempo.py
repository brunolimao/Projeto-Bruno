import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import sys

options = Options()

options = webdriver.FirefoxOptions()
options.add_argument("-headless")

class CustomPythonError(Exception):
  pass

class EmptyWatchlistError(Exception):
  pass

#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together1(usuarios):

  try:

    driver = webdriver.Firefox(options=options)

    numero_filmes_watchlist_total = 0

    for usuario in usuarios:

      
      
        driver.get(
          "https://letterboxd.com/"
          + usuario
          + "/watchlist/page/"
          + str(1)
        )
        time.sleep(1)

        numero_filmes_watchlist = driver.find_element(By.CLASS_NAME,"js-watchlist-count").text
        numero_filmes_watchlist = int(numero_filmes_watchlist.replace(" FILMS", "").replace(" FILM", ""))
        if numero_filmes_watchlist == 0:
          raise EmptyWatchlistError("Algum usuario com 0 filmes na watchlist.")
          
      

    numero_filmes_watchlist_total = numero_filmes_watchlist_total + numero_filmes_watchlist
    driver.close()
    print((numero_filmes_watchlist_total//28)*3)
  except NoSuchElementException as e:
    raise CustomPythonError("Erro: Elemento nao encontrado")
  except EmptyWatchlistError as e:
    raise("Algum usuario com 0 filmes na watchlist.")
  except Exception:
    raise CustomPythonError("Erro desconhecido")
  


def main():
  users = sys.argv[1]
  usuarios = users.split(',')
  get_watchlist_together1(usuarios)

if __name__ =='__main__' :
  main()
  