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

def get_watchlist_together2(usuarios):

  driver = webdriver.Firefox(options=options)

  filmes = []

  numero_filmes_watchlist_total = 0

  for usuario in usuarios:
    idx_pagina = 1
    continuar = True

    try:
      while continuar:
        driver.get(
          "https://letterboxd.com/"
          + usuario
          + "/watchlist/page/"
          + str(idx_pagina)
        )
        time.sleep(1)

        numero_filmes_watchlist = driver.find_element(By.CLASS_NAME,"js-watchlist-count").text
        numero_filmes_watchlist = int(numero_filmes_watchlist.replace(" FILMS", ""))
        

        filmes_watchlist = driver.find_elements(By.CLASS_NAME, "poster-container")

        if len(filmes_watchlist) > 0:
          for filme in filmes_watchlist:
            link = filme.find_element(By.CLASS_NAME, "film-poster").get_attribute("data-film-link")
            filmes.append(link)
        else:
          continuar = False
          # print(usuario + " acabou!")

        idx_pagina = idx_pagina + 1
    except NoSuchElementException:
      print(usuario + " acabou!")

    numero_filmes_watchlist_total = numero_filmes_watchlist_total + numero_filmes_watchlist
  driver.close()
  print(filmes)
  print(numero_filmes_watchlist_total)


def main():
  users = sys.argv[1]
  usuarios = users.split(',')
  get_watchlist_together2(usuarios)

if __name__ =='__main__' :
  main()
  