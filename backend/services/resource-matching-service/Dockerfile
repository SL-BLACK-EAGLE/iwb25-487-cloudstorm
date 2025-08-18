FROM ballerina/ballerina:2201.10.0
WORKDIR /app
COPY Ballerina.toml .
COPY main.bal .
RUN bal build
EXPOSE 8085
CMD ["java", "-jar", "target/bin/resource_matching_service.jar"]
