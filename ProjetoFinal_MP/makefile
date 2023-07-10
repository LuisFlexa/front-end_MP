# Comandos para instalar as ferramentas necessárias
install:
	npm install eslint prettier jest istanbul sonarqube-scanner

# Comando para executar todas as tarefas
all: lint format test coverage

# Tarefa para executar a verificação de lint
lint:
	npm run lint

# Tarefa para formatar o código usando o prettier
format:
	npx prettier --write .

# Tarefa para executar os testes
test:
	npx jest

# Tarefa para gerar informações de cobertura de código
coverage:
	npx istanbul cover node_modules/.bin/jest

# Tarefa para executar o scanner do SonarQube
sonar:
	npx sonar-scanner

.PHONY: install all lint format test coverage sonar

