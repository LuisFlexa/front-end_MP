# Comandos para instalar as ferramentas necessárias
install:
	@npm install eslint prettier jest istanbul sonarqube-scanner

# Comando para executar todas as tarefas
all: lint format test coverage

# Comandos para executar as tarefas individualmente
lint:
	@npx eslint .

format:
	@npx prettier --write .

test:
	@npx jest

coverage:
	@npx istanbul cover npx jest

sonar:
	@npx sonar-scanner

.PHONY: install all lint format test coverage sonar
