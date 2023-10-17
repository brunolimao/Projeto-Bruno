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

#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together2(usuarios):
  try:

    driver = webdriver.Firefox(options=options)

    filmes = []

    for usuario in usuarios:
      idx_pagina = 1
      continuar = True

      
      while continuar:
        driver.get(
          "https://letterboxd.com/"
          + usuario
          + "/watchlist/page/"
          + str(idx_pagina)
        )
        time.sleep(1)

        filmes_watchlist = driver.find_elements(By.CLASS_NAME, "poster-container")

        if len(filmes_watchlist) > 0:
          for filme in filmes_watchlist:
            link = filme.find_element(By.CLASS_NAME, "film-poster").get_attribute("data-film-link")
            filmes.append(link)
        else:
          continuar = False
          # print(usuario + " acabou!")

        idx_pagina = idx_pagina + 1
    driver.close()
    print(filmes)
  except NoSuchElementException as e:
    raise CustomPythonError("Erro: Elemento nao encontrado")
  except Exception:
    raise CustomPythonError("Erro desconhecido")



def main():
  users = sys.argv[1]
  usuarios = users.split(',')
  get_watchlist_together2(usuarios)

if __name__ =='__main__' :
  main()
  