# Use Java 21
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . /app

RUN mvn clean package

CMD ["java", "-jar", "target/*.jar"]
