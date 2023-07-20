# Kingmakers Frontend Interview

A simple React application that displays a list of campaigns that can be filtered by campaign name and date range.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev

or

npm run server
npm run start

```

### Use global AddCampaigns method.
> Call from the browser’s JavaScript console for testing purposes.
> If the same id is defined, the existing data is updated.
```
window.AddCampaigns([
    {"id":1,"name":"Update first data","startDate":"7/19/2019","endDate":"3/9/2025","Budget":88377},
    {"id":400,"name":"New Active","startDate":"7/19/2019","endDate":"3/9/2025","Budget":88377},
    {"id":401,"name":"New Inactive","startDate":"7/21/2019","endDate":"2/21/2020","Budget":608715},
    {"id":402,"name":"New wont display","startDate":"7/21/2017","endDate":"2/21/2016","Budget":608715},
])
```

### Stack used

> - [React](https://react.dev/)
> - [React-router-dom](https://www.npmjs.com/package/react-router-dom)

> - UI: [tailwindcss](https://tailwindcss.com/)
> - Icons: [react-icons](https://react-icons.github.io/react-icons/)
> - Datepicker: [react-flatpickr](https://www.npmjs.com/package/react-flatpickr)
> - Date format: [date-fns](https://www.npmjs.com/package/react-flatpickr)
> - Rest API: [json-server](https://www.npmjs.com/package/json-server)
> - Deployment: [concurrently](https://www.npmjs.com/package/concurrently)

#### Screenshots

![Desktop](/src/assets/images/screenshot-1.png)
![Desktop](/src/assets/images/screenshot-2.png)
![Desktop](/src/assets/images/screenshot-5.png)
![Desktop](/src/assets/images/screenshot-3.png)
![Desktop](/src/assets/images/screenshot-4.png)

#### Contact details.

>- [LinkedIn](https://www.linkedin.com/in/cihankoc/)
>- [cihankoc41@gmail.com](cihankoc41@gmail.com)
