import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options

options = Options()

options = webdriver.FirefoxOptions()
options.add_argument("-headless")

import sys

# Lista de usuarios a serem analisados
users = sys.argv[1]

usuarios = users.split(',')

# Caso verdadeiro, todos os usuarios tem que ter esse filme na watchlist. Se falso, no mínimo 2.
todo_mundo = sys.argv[2]

if todo_mundo == 'true':
  todo_mundo = True
else:
  todo_mundo = False
  
#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together():

  driver = webdriver.Firefox(options=options)

  filmes = []

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

  filmes_repetidos = []

  for filme in filmes:
    numero_filme = filmes.count(filme)
    if todo_mundo:
      if numero_filme == len(usuarios):
        filmes_repetidos.append(filme)
    else:
      if numero_filme > 1:
        filmes_repetidos.append(filme)

  filmes_comum = []

  for index, filme in enumerate(filmes_repetidos):
    if filme in filmes_comum:
      pass
    else:
      filmes_comum.append(filme)

  for filme in filmes_comum:
    driver.get("https://letterboxd.com/" + filme + "/genres")
    nome = driver.find_element(By.CLASS_NAME, "headline-1").text
    genres = ""
    generos = driver.find_elements(By.CLASS_NAME, "capitalize")
    generos_epecificos = generos[0].find_elements(By.CSS_SELECTOR, "a.text-slug")
    for idx, genero in enumerate(generos_epecificos):
      if idx != len(generos_epecificos)-1:
        genres = genres + genero.text + ", "
      else:
        genres = genres + genero.text
    time.sleep(1)
    imagem = driver.find_element(By.CSS_SELECTOR, "a#poster-zoom")
    linkImagem = imagem.find_element(By.CSS_SELECTOR, "img").get_attribute('src')
    nota = driver.find_element(By.CLASS_NAME, "display-rating").text
    link = "https://letterboxd.com" + filme
    print(nome + " | " + nota + " | " + genres + " | " + link + " | " + linkImagem)

  driver.close()


if __name__ =='__main__' :
  get_watchlist_together()