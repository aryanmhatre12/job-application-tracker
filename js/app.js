var app = angular.module("jobApp", []);

app.controller("JobController", function ($scope) {
$scope.darkMode =
    JSON.parse(localStorage.getItem("darkMode")) || false;

if ($scope.darkMode) {
    document.body.classList.add("dark-mode");
}
    // Load data from localStorage
    let savedApplications = JSON.parse(
        localStorage.getItem("applications")
    );

    $scope.applications = savedApplications || [];

    $scope.totalApplications = $scope.applications.length;
    function updateStats() {

    $scope.appliedCount =
        $scope.applications.filter(
            app => app.status === "Applied"
        ).length;

    $scope.interviewCount =
        $scope.applications.filter(
            app => app.status === "Interview Scheduled"
        ).length;

    $scope.selectedCount =
        $scope.applications.filter(
            app => app.status === "Selected"
        ).length;

    $scope.rejectedCount =
        $scope.applications.filter(
            app => app.status === "Rejected"
        ).length;
}

updateStats();

    // Add application
    $scope.addNewApplication = function () {

        if (
            !$scope.newCompany ||
            !$scope.newRole ||
            !$scope.newStatus
        ) {
            alert("Please fill all fields");
            return;
        }

        $scope.applications.push({
    company: $scope.newCompany,
    role: $scope.newRole,
    date: $scope.newDate,
    status: $scope.newStatus
});

        localStorage.setItem(
            "applications",
            JSON.stringify($scope.applications)
        );

        $scope.totalApplications = $scope.applications.length;
        updateStats();
        $scope.newCompany = "";
        $scope.newRole = "";
        $scope.newStatus = "";
    };

    // Delete application
    $scope.deleteApplication = function (index) {

    if (confirm("Are you sure you want to delete this application?")) {

        $scope.applications.splice(index, 1);

        localStorage.setItem(
            "applications",
            JSON.stringify($scope.applications)
        );

        $scope.totalApplications = $scope.applications.length;

        updateStats();
    }
};
$scope.editApplication = function (index) {

    $scope.newCompany =
        $scope.applications[index].company;

    $scope.newRole =
        $scope.applications[index].role;

    $scope.newStatus =
        $scope.applications[index].status;

    $scope.applications.splice(index, 1);

    localStorage.setItem(
        "applications",
        JSON.stringify($scope.applications)
    );

    $scope.totalApplications =
        $scope.applications.length;
};
$scope.toggleDarkMode = function () {

    document.body.classList.toggle("dark-mode");

    $scope.darkMode =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "darkMode",
        JSON.stringify($scope.darkMode)
    );
};

});