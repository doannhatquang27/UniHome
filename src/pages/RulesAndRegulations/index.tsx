import "./index.scss";

export default function RulesAndRegulations() {
  window.addEventListener("scroll", (event) => {
    console.log("Scrolling...");
    localStorage.setItem("detectMyChange", "isScrolled");
  });

  return (
    <div className="rulesAndRegulations">
      <div className="page-title">
        <p>Mẫu Quy định chung</p>
      </div>
      <p>
        <strong>Đối với Unihome dành cho khách hàng : </strong>
      </p>
      <p>*Bên A: Người cho thuê*</p>
      <p>*Bên B: Người thuê*</p>
      <p>
        <strong>Phía bên B (người thuê): </strong>
      </p>
      <p>
        Bên B phải chuyển giữ cọc cho Unihome thông qua app trọ Unihome. Unihome
        sẽ nhận tiền cọc giữ chỗ trong vòng 7 ngày
      </p>
      <p>Tối thiểu số tiền đặt giữ chỗ là 20% /1 tháng tiền phòng</p>
      <p>
        Sau 7 ngày bên B không làm hợp đồng và cũng không thông báo lý do của
        mình, thì bên B sẽ phải chấp nhận bị mất cọc giữ chỗ.
      </p>
      <p>
        Sau 7 ngày bên B ký kết hợp đồng với bên A, thì bên B sẽ tiếp tục chuyển
        cho Unihome tháng đầu tiên. Sau khi nhận được tiền Unihome sẽ hoàn trả
        lại số tiền cọc giữ chỗ trước đó trừ đi các chi phí và chuyển lại cho
        bên A
      </p>
      <p>
        Nếu người thuê báo trước 30 ngày, thì sẽ được trả lại tiền cọc . Và sẽ
        hỗ trợ gói miễn phí quảng cáo cho chủ trọ đẩy bài lên top
      </p>
      <p>Nếu người thuê ko báo trước 30 ngày, thì sẽ mất cọc</p>
      <p>
        <strong>Phía bên A (chủ trọ): </strong>
      </p>
      <p>
        Sau khi bên B chuyển cọc giữ chỗ cho Unihome để giữ chỗ trong 7 ngày,
        thì Unihome sẽ chuyển cho bên A ngay sau đó.
      </p>
      <p>
        Unihome sẽ tiếp tục chuyển tiền phòng tháng 1 cho bên A (nếu hợp đồng
        được kí kết giữa 2 bên), nhưng sẽ trừ phí cọc giữ chỗ và phí phụ thu môi
        giới.
      </p>
      <p>Đăng bài đăng với hình ảnh gần nhất, phải có clip quay về nơi ở</p>
      <p>
        <strong>Phía công ty: </strong>
      </p>
      <p>
        Công ty có quyền sửa đổi các quy định phù hợp để đảm bảo ứng dụng hoạt
        động đăng cách và suôn sẻ, đặc biệt là không làm trái với quy định của
        luật pháp.
      </p>
      <p>
        Nếu Người dùng tiếp tục sử dụng ứng dụng và/hoặc các dịch vụ Công ty
        cung cấp trên ứng dụng ('Các dịch vụ') sau ngày các sửa đổi bắt đầu có
        hiệu lực, Người dùng sẽ được cho là đã đồng ý bị ràng buộc bởi quy chế
        sửa đổi. Trong trường hợp Người dùng không đồng ý với các sửa đổi, Người
        dùng không được tiếp tục sử dụng ứng dụng và/hoặc Các dịch vụ.
      </p>
      <p>
        Hoạt động đăng tin, thuê phòng qua Unihome phải được thực hiện công
        khai, minh bạch, đảm bảo quyền lợi của người tiêu dùng.
      </p>
      <p>
        Công ty không đảm bảo truy cập vào các Dịch vụ được liên tục, không bị
        gián đoạn hoặc an toàn, và có thể có nhiều yếu tố can thiệp vào hoạt
        động của ứng dụng nằm ngoài tầm kiểm soát của Công ty. ứng dụng và các
        Dịch vụ được cung cấp "nguyên trạng" và khi có sẵn, không có bảo đảm
        dưới bất kỳ hình thức nào, cho dù công khai hay ngụ ý, và bao gồm nhưng
        không giới hạn, các bảo đảm về khả năng bán được, sự phù hợp với mục
        đích, tiêu đề hay không vi phạm Các đề mục và chă thích của Quy chế này
        được đưa vào chỉ nhằm mục đích thuận tiện trong tham khảo và không xác
        định, giới hạn, giải thích hoặc mô tả dưới bất kỳ hình thức nào phạm vi
        và quy mô của bất kỳ điều khoản nào trong Quy chế này.
      </p>
      <p>
        Việc Công ty không có hành động nào đối với vi phạm của Người dùng hoặc
        người nào khác sẽ không cấu thành sự từ bỏ của Công ty đối với quyền
        hành động xử lý các vi phạm sau đó hoặc tương tự.
      </p>
      <p>
        Nếu bất kỳ quy định nào của Quy chế này được xem là vô hiệu hoặc không
        thể thực thi được, quy định đó sẽ bị xóa bỏ nhưng các quy định còn lại
        vẫn sẽ được thực thi.
      </p>
      <p>
        <strong>
          Chính sách Bảo vệ thông tin cá nhân của người tiêu dùng{" "}
        </strong>
      </p>
      <ol>
        <li>Mục đích và phạm vi thu thập</li>
      </ol>
      <p>
        Việc thu thập dữ liệu chủ yếu trên Ứng dụng Sàn giao dịch TMĐT Unihome
        bao gồm: email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ
        khách hàng (thành viên). Đây là các thông tin mà Ứng dụng Unihome cần
        thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để Ứng dụng
        Unihome liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên
        Website nhằm đảm bảo quyền lợi cho người tiêu dùng. Đối với các cuộc hội
        thoại được thực hiện thông qua chức năng Chat với người đăng tin (bao
        gồm nhưng không giới hạn dữ liệu dưới dạng văn bản, âm thanh, hình ảnh)
        nhằm phục vụ cho việc trao đổi giữa người thuê và người đăng tin về hàng
        hóa/dịch vụ.
      </p>
      <p>
        Thông tin cá nhân người dùng được thu thập, sử dụng theo quy định cụ thể
        tại Quy chế này, Quy chế riêng tư và Chính sách bảo mật thông tin cá
        nhân cũng như phù hợp với quy định của pháp luật tùy từng thời điểm.
      </p>
      <p>
        Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt
        động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của
        mình cũng như mọi phát ngôn khi sử dụng dịch vụ của Unihome, bao gồm cả
        chức năng Chat với người đăng tin. Ngoài ra, thành viên có trách nhiệm
        thông báo kịp thời cho Ứng dụng sàn giao dịch TMĐT Unihome về những hành
        vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và
        mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
      </p>
      <ol start={2}>
        <li>Phạm vi sử dụng thông tin</li>
      </ol>
      <p>
        Ứng dụng sàn giao dịch TMĐT Unihome sử dụng thông tin thành viên cung
        cấp để:
      </p>
      <p>Cung cấp các dịch vụ đến Thành viên;</p>
      <p>
        Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và
        Ứng dụng sàn giao dịch TMĐT Unihome;
      </p>
      <p>
        Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc
        các hoạt động giả mạo Thành viên;
      </p>
      <p>
        Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.
      </p>
      <p>
        Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận
        và liên hệ có liên quan đến giao dịch tại Ứng dụng Unihome.
      </p>
      <p>
        Trong trường hợp có yêu cầu của pháp luật: Ứng dụng sàn giao dịch TMĐT
        Unihome có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi
        có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan
        công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của
        khách hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân
        của thành viên.
      </p>
      <ol start={3}>
        <li>Thời gian lưu trữ thông tin</li>
      </ol>
      <p>
        Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu
        hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong
        mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ
        của Ứng dụng Unihome theo quy định của pháp luật tùy từng thời điểm
      </p>
      <ol start={4}>
        <li>Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</li>
      </ol>
      <p>Công ty TNHH Unihome</p>
      <p>Địa chỉ:</p>
      <p>Điện thoại:</p>
      <p>Email:</p>
      <ol start={5}>
        <li>
          Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá
          nhân của mình
        </li>
      </ol>
      <p>
        Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông
        tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa
        thông tin cá nhân hoặc yêu cầu Ứng dụng Unihome thực hiện việc này.
      </p>
      <p>
        Thành viên có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho bên
        thứ 3 đến Ban quản trị của Ứng dụng sàn giao dịch thương mại điện tử
        Unihome. Khi tiếp nhận những phản hồi này,
      </p>
      <p>
        Ứng dụng Unihome sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời
        lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.
      </p>
      <ol start={6}>
        <li>Cam kết bảo mật thông tin cá nhân khách hàng</li>
      </ol>
      <p>
        Thông tin cá nhân của thành viên trên Ứng dụng sàn giao dịch thương mại
        điện tử Unihome được Ứng dụng sàn giao dịch thương mại điện tử Unihome
        cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của
        Công ty. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được
        thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp
        luật có quy định khác.
      </p>
      <p>
        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào
        về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ
        thành viên.
      </p>
      <p>
        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến
        mất mát dữ liệu cá nhân thành viên, Unihome sẽ có trách nhiệm thông báo
        vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho
        thành viên được biết.
      </p>
      <p>
        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao
        gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung
        tâm an toàn cao cấp của Unihome.
      </p>
      <p>
        Ban quản lý Ứng dụng Unihome yêu cầu các cá nhân khi đăng ký/mua hàng là
        thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ
        và tên, địa chỉ liên lạc, email, điện thoại, ..., và chịu trách nhiệm về
        tính pháp lý của những thông tin trên. Ban quản lý Ứng dụng Unihome
        không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên
        quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá
        nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
      </p>
    </div>
  );
}
