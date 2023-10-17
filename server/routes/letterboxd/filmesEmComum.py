
import sys

class CustomPythonError(Exception):
  pass

class EmptyFilmesEmComumError(Exception):
  pass

#
# PROGRAMA QUE MSOTRA A INTERSECAO DA WATCHILIST DE USUARIOS NO LETTERBOXD
#

def get_watchlist_together3(filmes, usuarios, todo_mundo):
  
  try:
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

    for filme in filmes_repetidos:
      if filme in filmes_comum:
        pass
      else:
        filmes_comum.append(filme)
    
    if len(filmes_comum) == 0:
      raise EmptyFilmesEmComumError("Nao existe filmes em comum na watchlist.")

    print(filmes_comum)
    print(len(filmes_comum)*5)
  except EmptyFilmesEmComumError:
    raise ("Nao existe filmes em comum na watchlist.")
  except Exception:
    raise CustomPythonError("Error")

def main():

  # Lista de usuarios a serem analisados
  users = sys.argv[1]

  usuarios = users.split(',')

  # Caso verdadeiro, todos os usuarios tem que ter esse filme na watchlist. Se falso, no mínimo 2.
  todo_mundo = sys.argv[2]

  if todo_mundo == 'true':
    todo_mundo = True
  else:
    todo_mundo = False
  
  filmes1 = sys.argv[3]
  filmes = filmes1.split(",")

  get_watchlist_together3(filmes, usuarios, todo_mundo)


if __name__ =='__main__' :
  main()