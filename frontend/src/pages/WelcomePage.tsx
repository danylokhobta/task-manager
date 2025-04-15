import PageContainer from "../components/PageContainer";

const WelcomePage = () => {
  return (
    <PageContainer pageTitle="v0.0.0">
      <h1 className="text-2xl">Welcome to Your Task Management App! <br/><br/>
      This app is my first full-stack project and marks my first venture into backend development. While there’s still a lot more I want to add and improve, even this version is ready for demonstration. It showcases my ability to design a readable and understandable backend and gives you a preview of how I handle RESTful APIs on the frontend. <br/><br/>
      At the moment, the app has password encryption, but please note that it’s only on the password field. To ensure your privacy and security, avoid storing sensitive information within the app for now. <br/><br/>
      If you decide you no longer want to use your account, I kindly ask that you delete it. This will free up space on the server and remove all tasks associated with your account. <br /><br/>
      Thank you for using the app, and stay tuned for future updates!</h1>
    </PageContainer>
  );
};

export default WelcomePage;