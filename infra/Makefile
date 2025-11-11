up:
	docker compose -f infra/docker-compose.yml up --build

down:
	docker compose -f infra/docker-compose.yml down

logs:
	docker compose -f infra/docker-compose.yml logs -f

sh-web:
	docker compose -f infra/docker-compose.yml exec web sh

db-migrate:
	docker compose -f infra/docker-compose.yml exec web npm run -w apps/web prisma:migrate

db-reset:
	docker compose -f infra/docker-compose.yml exec web npx prisma migrate reset --force

seed:
	docker compose -f infra/docker-compose.yml exec web npm run -w apps/web prisma:seed
