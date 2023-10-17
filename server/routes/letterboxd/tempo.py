import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import sys

options = Options()

options = webdriver.FirefoxOptions()
options.add_argument("-headless")



# Lista de usuarios a serem analisados


#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together1(usuarios):

  driver = webdriver.Firefox(options=options)

  numero_filmes_watchlist_total = 0

  for usuario in usuarios:

    try:
    
      driver.get(
        "https://letterboxd.com/"
        + usuario
        + "/watchlist/page/"
        + str(1)
      )
      time.sleep(1)

      numero_filmes_watchlist = driver.find_element(By.CLASS_NAME,"js-watchlist-count").text
      numero_filmes_watchlist = int(numero_filmes_watchlist.replace(" FILMS", ""))
        
    except NoSuchElementException:
      print(usuario + " acabou!")

    numero_filmes_watchlist_total = numero_filmes_watchlist_total + numero_filmes_watchlist
  driver.close()
  print((numero_filmes_watchlist_total//28)*3)


def main():
  users = sys.argv[1]
  usuarios = users.split(',')
  get_watchlist_together1(usuarios)

if __name__ =='__main__' :
  main()
  