all:
	docker-compose up --build -d

no-detach:
	docker-compose up --build

build: 
	docker-compose build --no-cache

re: clean-docker build all
	docker-compose up -d

restart: stop all

down:
	docker-compose down

stop:
	docker-compose stop

clean-docker:
	docker system prune -a

log-back:
	docker logs matcha_backend -f

log-db:
	docker logs matcha_database -f

log-front:
	docker logs front -f

enter-back:
	docker exec -it back sh

enter-db:
	docker exec -it db sh

enter-front:
	docker exec -it front sh

info:
	@echo "\033[1;33mall:\033[m"
	@echo "	docker-compose up --build -d"
	@echo ""
	@echo "\033[1;33mbuild:\033[m"
	@echo "	docker-compose build --no-cache"
	@echo ""
	@echo "\033[1;33mre: clean-docker build all\033[m"
	@echo "	docker-compose up -d"
	@echo ""
	@echo "\033[1;33mrestart: stop all\033[m"
	@echo ""
	@echo "\033[1;33mdown:\033[m"
	@echo "	docker-compose down"
	@echo ""
	@echo "\033[1;33mstop:\033[m"
	@echo "	docker-compose stop"
	@echo ""
	@echo "\033[1;33mclean-docker:\033[m"
	@echo "	docker system prune -a"
	@echo ""
	@echo "\033[1;33mlog-back:\033[m"
	@echo "	docker logs back -f"
	@echo ""
	@echo "\033[1;33mlog-db:\033[m"
	@echo "	docker logs db -f"
	@echo ""
	@echo "\033[1;33mlog-front:\033[m"
	@echo "	docker logs front -f"
	@echo ""
	@echo "\033[1;33menter-back:\033[m"
	@echo "	docker exec -it back sh"
	@echo ""
	@echo "\033[1;33menter-db:\033[m"
	@echo "	docker exec -it db sh"
	@echo ""
	@echo "\033[1;33menter-front:\033[m"
	@echo "	docker exec -it front sh"