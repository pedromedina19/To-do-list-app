# Use a imagem oficial do Java para a fase de construção
FROM maven:3.8.1-openjdk-17-slim AS build

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o pom.xml e baixe todas as dependências
COPY pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# Copie o código fonte do projeto e construa o projeto
COPY src ./src
RUN mvn package -DskipTests

# Use a imagem oficial do Java para a fase de execução
FROM openjdk:17-jdk-slim

# Copie o jar do estágio de construção
COPY --from=build /app/target/*.jar /usr/local/lib/app.jar

# Defina a porta que a aplicação vai rodar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java","-Xmx2048M", "-jar", "/usr/local/lib/app.jar"]
