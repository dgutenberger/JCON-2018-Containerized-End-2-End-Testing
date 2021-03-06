_dynamicInclude($includeFolder);
var testCase = new TestCase(50, 70);
var env = new Environment();
var screen = new Region();

var pdfFilePath = "~/todo-backup.pdf";
try {

    // Add entry
    _highlight(_textbox("title"));
    _click(_textbox("title"));
    _setValue(_textbox("title"), "Sample todo");

    _highlight(_textarea("description"));
    _click(_textarea("description"));
    _setValue(_textarea("description"), "Sample todo description");

    _highlight(_submit("Add"));
    _click(_submit("Add"));
    testCase.endOfStep("Add todo entry", 30);

    //load images
    testCase.addImagePaths("centos_chrome");

    //open print preview
    env.type("p", Key.CTRL);

    //save as pdf
    screen.find("save_button").highlight().click();
    env.sleep(1);
    env.type("a", Key.CTRL) //mark filename in "save under" dialog
        .type(pdfFilePath + Key.ENTER) //type filename and press ENTER
        .sleep(1);
    testCase.endOfStep("Create backup of todo entry", 30);

    //Complete entry
    _highlight(_listItem("Sample todox"));
    _highlight(_checkbox("complete"));
    _click(_checkbox("complete"));
    testCase.endOfStep("Complete todo entry", 30);

    //Delete entry
    _highlight(_span("x"));
    _click(_span("x"));
    testCase.endOfStep("Delete todo entry", 30);

} catch (e) {
    testCase.handleException(e);
} finally {
    testCase.saveResult();
}
