## Run the application

composer update
npm install
php artisan migrate
php artisan serve
php artisan key:generate

composer install --ignore-platform-reqs

## Access
Admin Login

http://127.0.0.1:8000/adm/login

email: admin@admin.com
pass: admin123


Guest & Registered Users Login

http://127.0.0.1:8000/login

email: testuser@testuser.com
pass: testuser