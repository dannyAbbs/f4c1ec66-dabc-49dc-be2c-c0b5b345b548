#pragma checksum "C:\Users\dababio\Source\Repos\Outlet-Manager\Outlet-Manager\Pages\Customer.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "097bb88e4f07522dc842e4b58f70f200cfaa89cb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(Outlet_Manager.Pages.Pages_Customer), @"mvc.1.0.razor-page", @"/Pages/Customer.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure.RazorPageAttribute(@"/Pages/Customer.cshtml", typeof(Outlet_Manager.Pages.Pages_Customer), null)]
namespace Outlet_Manager.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\dababio\Source\Repos\Outlet-Manager\Outlet-Manager\Pages\_ViewImports.cshtml"
using Outlet_Manager;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"097bb88e4f07522dc842e4b58f70f200cfaa89cb", @"/Pages/Customer.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e0ad35297918538735ec4784c9b22f6e1b211d51", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Customer : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "0", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "1", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "2", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", "~/js/PagesScripts/customer.js", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(50, 927, true);
            WriteLiteral(@"
<div class=""card"">
    <div class=""card-header"">
        <div class=""row"">
            <div class=""col-md-4"">
                <div class=""input-group input-group-sm"">
                    <input type=""text"" class=""form-control"" placeholder=""Search by name"" id=""txtSearch"">
                    <div class=""input-group-append"">
                        <button class=""btn btn-outline-success"" type=""button"" id=""btnSearch"" disabled>
                            <i class=""fa fa-search""></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class=""offset-md-6 col-md-2"">
                <button class=""btn btn-success float-right btn-sm"" type=""button"" id=""btnAdd"">Add</button>
            </div>
        </div>
    </div>
    <div class=""card-body"">
        <table class=""table table-sm"" id=""customer-table""></table>
    </div>
</div>


");
            EndContext();
            DefineSection("modals", async() => {
                BeginContext(993, 2376, true);
                WriteLiteral(@"
    <div class=""modal"" id=""mdlCustomers"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog"" style=""width: 600px !important; max-width: 600px !important"">
            <div class=""modal-content"">

                <!-- Modal Header -->
                <div class=""modal-header"">
                    <h5 class=""modal-title""></h5>
                    <button type=""button"" class=""close"" data-dismiss=""modal"">&times;</button>
                </div>

                <!-- Modal body -->
                <div class=""modal-body"">
                    <small class=""text-primary"">All fields are required</small>
                    <div class=""form-horizontal"">
                        <!-- Nav tabs -->
                        <ul class=""nav nav-tabs"">
                            <li class=""nav-item"">
                                <a class=""nav-link active"" data-toggle=""tab"" href=""#home"">Basic Details</a>
                            </li>
                            <li class=""");
                WriteLiteral(@"nav-item"">
                                <a class=""nav-link"" data-toggle=""tab"" href=""#menu1"">Contact Person</a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class=""tab-content"">
                            <div class=""tab-pane container active"" id=""home"">
                                <div class=""form-row"">
                                    <div class=""col-md-4"">
                                        <label for="""">Code</label>
                                        <input type=""text"" class=""form-control form-control-sm"" id=""txtCode"">
                                    </div>
                                    <div class=""col-md-8"">
                                        <label for="""">Name</label>
                                        <input type=""text"" class=""form-control form-control-sm"" id=""txtName"">
                                    </div>
                                </div>
    ");
                WriteLiteral(@"                            <div class=""form-row"">
                                    <div class=""col-4"">
                                        <label for="""">Pay Code</label>
                                        <select class=""form-control form-control-sm"" id=""cmbPayCode"">
                                            ");
                EndContext();
                BeginContext(3369, 42, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "097bb88e4f07522dc842e4b58f70f200cfaa89cb8218", async() => {
                    BeginContext(3387, 15, true);
                    WriteLiteral("Select Pay Code");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3411, 46, true);
                WriteLiteral("\r\n                                            ");
                EndContext();
                BeginContext(3457, 31, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "097bb88e4f07522dc842e4b58f70f200cfaa89cb9737", async() => {
                    BeginContext(3475, 4, true);
                    WriteLiteral("Cash");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3488, 46, true);
                WriteLiteral("\r\n                                            ");
                EndContext();
                BeginContext(3534, 31, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "097bb88e4f07522dc842e4b58f70f200cfaa89cb11244", async() => {
                    BeginContext(3552, 4, true);
                    WriteLiteral("Card");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3565, 3537, true);
                WriteLiteral(@"
                                        </select>
                                    </div>
                                    <div class=""col-8"">
                                        <label for="""">Town (Location)</label>
                                        <select class=""form-control form-control-sm"" id=""cmbTown""></select>
                                    </div>
                                </div>
                                <div class=""form-row"">
                                    <div class=""col-4"">
                                        <label for="""">Status</label>
                                        <select class=""form-control form-control-sm"" id=""cmbStatus""></select>
                                    </div>
                                </div>
                            </div>
                            <div class=""tab-pane container fade"" id=""menu1"">
                                <div class=""form-row"">
                                    <div class=""co");
                WriteLiteral(@"l-6"">
                                        <label for="""">First Name</label>
                                        <input type=""text"" class=""form-control form-control-sm"" id=""txtFname"">
                                    </div>
                                    <div class=""col-6"">
                                        <label for="""">Last Name</label>
                                        <input type=""text"" class=""form-control form-control-sm"" id=""txtLname"">
                                    </div>
                                </div>
                                <div class=""form-row"">
                                    <div class=""col-12"">
                                        <label for="""">Address</label>
                                        <textarea class=""form-control form-control-sm"" rows=""3"" id=""txtAddress""></textarea>
                                    </div>
                                </div>
                                <div class=""form-row"">
           ");
                WriteLiteral(@"                         <div class=""col-12"">
                                        <label for="""">Email</label>
                                        <input type=""email"" class=""form-control form-control-sm"" id=""txtEmail"" />
                                    </div>
                                </div>
                                <div class=""form-row"">
                                    <div class=""col-md-6"">
                                        <label for="""">Telephone</label>
                                        <input type=""tel"" class=""form-control form-control-sm"" id=""txtTelephone"" />
                                    </div>
                                    <div class=""col-md-6"">
                                        <label for="""">Mobile No.</label>
                                        <input type=""text"" class=""form-control form-control-sm"" id=""txtMobileNo"" />
                                    </div>
                                </div>
                        ");
                WriteLiteral(@"    </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class=""modal-footer"">
                    <button type=""button"" class=""btn btn-outline-danger"" data-dismiss=""modal"">Close</button>
                    <button type=""button"" class=""btn btn-success"" id=""btnSubmit"">Submit</button>
                </div>

            </div>
        </div>
    </div>

");
                EndContext();
            }
            );
            BeginContext(7105, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            DefineSection("Scripts", async() => {
                BeginContext(7124, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(7130, 79, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "097bb88e4f07522dc842e4b58f70f200cfaa89cb16762", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.ScriptTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.Src = (string)__tagHelperAttribute_3.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
#line 138 "C:\Users\dababio\Source\Repos\Outlet-Manager\Outlet-Manager\Pages\Customer.cshtml"
__Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion = true;

#line default
#line hidden
                __tagHelperExecutionContext.AddTagHelperAttribute("asp-append-version", __Microsoft_AspNetCore_Mvc_TagHelpers_ScriptTagHelper.AppendVersion, global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(7209, 2, true);
                WriteLiteral("\r\n");
                EndContext();
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Outlet_Manager.Pages.CustomerModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Outlet_Manager.Pages.CustomerModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Outlet_Manager.Pages.CustomerModel>)PageContext?.ViewData;
        public Outlet_Manager.Pages.CustomerModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
