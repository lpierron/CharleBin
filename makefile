install:
	composer install

start:
	php -S localhost:8080

test:
	./vendor/bin/phpunit tst

lint:
	./vendor/bin/phpcs --standard=linters/my-phpcs.xml ./lib/

