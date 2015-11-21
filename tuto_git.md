qerrrrrrrrgsergsrthsrthsrt

#Tuto git
##Architecture git

Deux branches : 

- develop
	- sur laquelle on developpe (no shit)
- master
	- Derniere version clean

##Pour travailler en local
Pour chaque feature on crée une nouvelle branche à partir de develop
	
	git checkout -b maBrancheLocale
	git commit -am'[label] message de commit'
	git commit -am'[label] message de commit 2'
	
Quand on veux push notre travail sur la branche commune, on commence par récuper le travail de la team
	
	git checkout develop
	git pull --rebase
	
Puis on applique notre travail par dessus

	git checkout maBrancheLocale
	git rebase develop
	
Puis on push

	git checkout develop
	git merge maBrancheLocale
	git push
	
Et enfin on supprime la branche locale (pas obligé)

	git branch -d maBrancheLocale
	
##Conseils

Faire des commits atomiques. Plus on fait de commits plus c'est facile de se retrouver et de retrouver le moment ou ca a commencé à partir en couille

Les textes de commit doivent etre compréhensibles et montrer votre intention (n'hesitez pas à etre verbeux)


	